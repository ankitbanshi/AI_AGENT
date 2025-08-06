import axios from 'axios';

export async function parseAndExecutePlugins(message: string) {
  const output: string[] = [];

  if (message.toLowerCase().includes('weather')) {
    // Fake or real weather
    const city = message.split('in ')[1] || 'Bangalore';
    const weather = await axios.get(`https://wttr.in/${city}?format=3`);
    output.push(`Weather in ${city}: ${weather.data}`);
  }

  const mathMatch = message.match(/([0-9+\-*/().\s]+)/);
  if (mathMatch) {
    try {
      const result = eval(mathMatch[0]);
      output.push(`Math result: ${result}`);
    } catch {}
  }

  return output;
}