import axios from 'axios';

export async function Kurslar(code: string): Promise<number> {
  try {
    const { data } = await axios.get(
      `https://cbu.uz/uz/arkhiv-kursov-valyut/json/`,
    );
    const val = data.find((c: any) => c.Ccy === code);
    return parseFloat(val?.Rate || '0');
    
  } catch (error) {
    return error.message;
  }
}
