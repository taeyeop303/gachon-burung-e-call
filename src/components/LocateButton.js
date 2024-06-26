import React from 'react';
import { useMap } from 'react-leaflet';

function LocateButton({ currentPosition }) {
  const map = useMap();

  const handleLocate = () => {
    if (currentPosition) {
      map.setView(currentPosition, 17); // 17은 줌 레벨
    }
  };

  return (
    <button onClick={handleLocate} className="locate-button">
      내 위치 보기
    </button>
  );
}

export default LocateButton;
