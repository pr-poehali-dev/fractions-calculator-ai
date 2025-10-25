import json
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Solve math problems using OpenAI API
    Args: event with httpMethod, body containing problem description
    Returns: Step-by-step solution in JSON format
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        problem = body_data.get('problem', '').strip()
        
        if not problem:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Problem description is required'})
            }
        
        api_key = os.environ.get('OPENAI_API_KEY')
        if not api_key:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'OpenAI API key not configured'})
            }
        
        import openai
        
        client = openai.OpenAI(
            api_key=api_key,
            base_url="https://api.openai.com/v1"
        )
        
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": """Ты YaSentAI - математический ассистент. Решай задачи пошагово на русском языке.

Формат ответа:
1. Анализ задачи (что дано, что нужно найти)
2. Метод решения
3. Пошаговое решение с объяснениями
4. Финальный ответ

Используй понятный язык, показывай промежуточные вычисления."""
                },
                {
                    "role": "user",
                    "content": problem
                }
            ],
            temperature=0.3,
            max_tokens=1500
        )
        
        solution = response.choices[0].message.content
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'problem': problem,
                'solution': solution,
                'model': 'YaSentAI (GPT-4o-mini)',
                'timestamp': context.request_id
            }, ensure_ascii=False)
        }
        
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid JSON'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Server error: {str(e)}'})
        }