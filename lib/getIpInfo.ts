import { ipInfoI } from './../resources/interface';
import axios from 'axios';
import {useState,useEffect} from 'react'

const useGetIpInfo = (ip:string) => {
    const [ipInfo, setIpInfo] = useState<ipInfoI>()

    const options = ip === '' ? {
        method: 'GET',
        url: 'https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/',
        headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
            'X-RapidAPI-Host': 'ip-geolocation-ipwhois-io.p.rapidapi.com',
        },
    } : {
        method: 'GET',
        url: 'https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/',
        params: { ip: `${ip}` },
        headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
            'X-RapidAPI-Host': 'ip-geolocation-ipwhois-io.p.rapidapi.com',
        },
    }
    
    const getApi = async () => {
		try {
            const response = await axios.request(options);
            const data:ipInfoI = await response.data
			setIpInfo({...data})
        } catch (error) {
			console.log(error);
		}
    };
    
    useEffect(() => { 
        getApi();    
    }, [ip])
    
    return ipInfo
}

export default useGetIpInfo