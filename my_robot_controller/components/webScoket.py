import asyncio
import websockets

async def send_message(message):
    uri = "ws://localhost:3000/realtime/test"  # Replace with your WebSocket server URL
    async with websockets.connect(uri) as websocket:
        await websocket.send(message)
        print(f"Sent: {message}")

asyncio.get_event_loop().run_until_complete(send_message('dddd'))