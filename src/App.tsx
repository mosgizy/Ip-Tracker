import { useState } from 'react';
import './App.css';
import useGetIpInfo from '../lib/getIpInfo';
import { ipInfoI } from '../resources/interface';
import iconArrow from '../resources/assets/icon-arrow.svg';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import { Icon } from 'leaflet';
import locationImg from '../resources/assets/location.svg';

function App() {
	const [input, setInput] = useState('');
	const [ipValue, setIpValue] = useState('');
	const [location, setLocation] = useState<LatLngExpression>([
		50.1109221, 8.6821267,
	]);

	const ipInfo: ipInfoI | undefined = useGetIpInfo(ipValue);

	const customIcon = new Icon({
		iconUrl: `${locationImg}`,
		iconSize: [33, 33],
	});

	const handleSubmit = () => {
		setIpValue(input);
		ipInfo && setLocation([ipInfo?.latitude, ipInfo?.longitude]);
	};

	return (
		<main className="main">
			<div className="section">
				<header></header>
				<div className="map">
					{ipInfo && (
						<MapContainer center={location} zoom={6} scrollWheelZoom={true}>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
							<Marker position={location} icon={customIcon}>
								<Popup></Popup>
							</Marker>
						</MapContainer>
					)}
				</div>
			</div>
			<div className="details-wrapper">
				<div className="details">
					<h1>IP Address Tracker</h1>
					<div className="input-wrapper">
						<input
							type="text"
							value={input}
							placeholder="Search for any IP address or domain"
							onChange={(e) => setInput(e.target.value)}
						/>
						<button onClick={handleSubmit}>
							<img src={iconArrow} alt="arrow" />
						</button>
					</div>
					<div className="info-wrapper">
						<div className="info">
							<span>ip address</span>
							<p>{ipInfo?.ip}</p>
						</div>
						<div className="info">
							<span>Location</span>
							<p>
								{ipInfo?.city}, {ipInfo?.region}
							</p>
						</div>
						<div className="info">
							<span>timezone</span>
							<p>
								{ipInfo?.timezone_name}
								{ipInfo?.timezone_gmt}
							</p>
						</div>
						<div className="info">
							<span>isp</span>
							<p>{ipInfo?.isp}</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

export default App;

const icon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
		<path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
	</svg>
);
