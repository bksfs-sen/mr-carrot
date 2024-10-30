import { useState, useEffect, useRef } from "react";

export function InitMapComponent({center, zoom, mapHeight, markerOrAutoCompletePosition, setMarkerOrAutoCompletePosition}) {
    
    const ref = useRef();
    const [marker, setMarker] = useState(null);
    const [map, setMap] = useState(null);          

    // need handle on change map to change marker position depend on new center
    /*if(document.getElementById("map")){
        map?.addListener("center_changed", (event) => {
            console.log('e789', event, map?.getCenter(), 
            {lat: parseFloat(map?.getCenter().lat().toFixed(3)), lng: parseFloat(map?.getCenter().lng().toFixed(3))}
            );
            setMarkerOrAutoCompletePosition({lat: parseFloat(map?.getCenter().lat().toFixed(3)), lng: parseFloat(map?.getCenter().lng().toFixed(3))});
        });
    }*/
    
    useEffect(()=>{
       /*  setMap(() => new google.maps.Map(ref?.current, {
          zoom: zoom,
          center: center
        })); */
    },[ref?.current])



    useEffect(() => {
        if(map){
        setTimeout(() => {
            if(!marker){
               /*  setMarker( () => new google.maps.Marker({
                    position: markerOrAutoCompletePosition,
                    map: new google.maps.Map(ref?.current, {
                        zoom: zoom,
                        center: markerOrAutoCompletePosition
                        }),
                        draggable: true,
                        
                })); */
            }
            if(marker){
                marker?.addListener('dragend', function(event) {
                    setMarkerOrAutoCompletePosition({lat: parseFloat(event.latLng.lat().toFixed(3)), lng: parseFloat(event.latLng.lng().toFixed(3))});
                });
            }            
        }, 1000);
        }
    }, [map, marker])

    return <div ref={ref} id="map" style={{height: mapHeight || 'auto'}} />;
};
