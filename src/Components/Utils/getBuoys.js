export default async function getBuoys(
    lat,
    lng,
    buoyMarkers,
    setBuoyMarkers,
    setLoading
) {
    console.log({ lat, lng });

    console.log(process.env.REACT_APP_API_SERVER);
    try {
        setLoading(true);
        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/wavedata/lat/${lat}/lng/${lng}`,
            {
                credentials: "include",
            }
        );
        const { obshder_array, station_id_obj } = await res.json();

        // console.log({ obshder_array, station_id_obj })
        // console.log({ buoyMarkers })
        //spread into any other existing buoy data
        setLoading(false);
        setBuoyMarkers({ ...buoyMarkers, ...station_id_obj });

        return;
    } catch (err) {
        setLoading(false);

        console.error("err");
        console.log(err);
        console.log("Cannot get Buoy data");
    }
}
