import React from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapPage.css';
import LocateButton from './LocateButton';
import useMapFunctions from './mapFunctions';

function MapPage() {
  const {
    users,
    currentPosition,
    mapCenter,
    userType,
    status,
    message,
    userCount,
    handleUserTypeChange,
    handleStatusChange,
    handleMessageChange,
    requestCarpool,
    getIcon
  } = useMapFunctions();

  return (
    <div className="map-container" style={{ textAlign: 'center' }}>
      <MapContainer center={mapCenter} zoom={17} className="map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          detectRetina={true} // 고해상도 화면에서 고해상도 타일 사용
        />
        {currentPosition && (
          <Marker
            position={currentPosition}
            icon={getIcon(userType)}
            opacity={status === 'on' ? 1 : 0.5}
          >
            {status === 'on' && message && (
              <Tooltip permanent direction='bottom'>
                <div>
                  <p>{message}</p>
                </div>
              </Tooltip>
            )}
          </Marker>
        )}
        {users.map((user) => (
          user.status === 'on' && user.message && (
            <Marker
              key={user.userId}
              position={[user.coordinates.lat, user.coordinates.lng]}
              icon={getIcon(user.userType)}
            >
              <Tooltip permanent>
                <div>
                  <p>{user.message}</p>
                </div>
              </Tooltip>
            </Marker>
          )
        ))}
        <LocateButton currentPosition={currentPosition} />
      </MapContainer>
      <div className="controls">
        <button onClick={handleUserTypeChange}>접속 모드 변경 (현재: {userType})</button>
        <button onClick={handleStatusChange}>내 위치 공유 (현재: {status})</button>
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="상태 메시지 입력"
        />
      </div>
      <div className="user-count">
        ::: 접속자 수 ::: <br/><br/> 뚜 벅 이 --- {userCount.walkers}<br/>부 릉 이 --- {userCount.drivers}<br/> TOTAL --- {userCount.total}
      </div>

    </div>
  );
}

export default MapPage;
