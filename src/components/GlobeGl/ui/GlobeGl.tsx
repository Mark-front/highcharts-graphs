import {memo, useEffect, useRef, useState} from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';
import {renderToStaticMarkup} from "react-dom/server";
// import dataGeo from '../assets/main.geo.json';
// import dataGeo from '../../public/dhsdfgsdgfsdfg.geojson';

const BtnLabelPoligon = ({mama}) => <button className={'daddy'}>my fan { mama }</button>
export const GlobeGl = memo(() => {
    const [countries, setCountries] = useState({features: []});
    const [russia, setRussia] = useState({features: []});
    const [newData, setNewData] = useState({features: []});
    const globe = useRef()
    const polygonMeshMaterial = new THREE.MeshPhongMaterial({
        side: 0,
        opacity: 0,
        visible: false
    })
    const globeMeshMaterial = new THREE.MeshPhongMaterial({
        color: '#242424',
        visible: true
    })
    
    const [hoverD, setHoverD] = useState();
    
    useEffect(() => {
        // load data
        fetch('/public/us-states.json').then(res => res.json()).then(setCountries);
        // fetch('/public/RUS_adm2_compress.json').then(res => res.json()).then(setCountries);
        // fetch('/public/RUS_adm2_over-compress.json').then(res => res.json()).then(setCountries);
        // fetch('/public/RUS_adm2.geojson').then(res => res.json()).then(setRussia);
        setNewData({
            features: [
                ...countries.features,
                ...russia.features
            ]
        })
    }, []);
    
    // Gen random data
    const N = 10;
    const gData = [...Array(N).keys()].map(() => ({
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        maxR: Math.random() * 20 + 3,
        propagationSpeed: (Math.random() - 0.5) * 20 + 1,
        repeatPeriod: Math.random() * 2000 + 200
    }));
    
    const colorInterpolator = t => `rgba(255,100,50,${Math.sqrt(1-t)})`;
    
    return <Globe
        ref={globe}
        backgroundColor={'#242424'}
        lineHoverPrecision={0}
        showGraticules={true}
        showAtmosphere={false}
        polygonsData={countries.features}
        polygonCapColor={d => d === hoverD ? 'steelblue' : '#333'}
        polygonSideColor={() => 'rgba(0, 0, 0, 0)'}
        polygonAltitude={() => 0.01}
        ringsData={gData}
        ringAltitude={() => 0.601}
        ringColor={() => colorInterpolator}
        polygonStrokeColor={() => '#111'}
        polygonLabel={({properties: d}) => {
            console.log(d)
            return renderToStaticMarkup(<BtnLabelPoligon mama={'соска'}/>)
        }}
        onPolygonHover={setHoverD}
        polygonsTransitionDuration={300}
        
        polygonSideMaterial={polygonMeshMaterial}
        globeMaterial={globeMeshMaterial}
    />;
})

GlobeGl.displayName = 'GlobeGl'