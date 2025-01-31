
const PERUVIAN_VERT = 10735 - 8113;
const TRAM_VERT = 10953 - 8098;
const MINERAL_BASIN_VERT = 10949 - 9529;
const BALDY_VERT = 10506 - 9582;
const MID_GAD_VERT = 9206 - 7890;
const GADZOOM_VERT = 9702 - 7886;
const GAD2_VERT = 9968 - 8732;
const LITTLE_CLOUD_VERT = 10824 - 9542;

// Maps Web response lift names to a json containing
// the liftName I want to render and the vert I've calculated.
// Unfortunately I only know people who ski these 4 lifts.
const SNOWBIRD_LIFTS = {
    'Mineral Basin': { name: 'Mineral Basin', vert: MINERAL_BASIN_VERT },
    'Gad Zoom Quad': { name: 'Gad Zoom', vert: GADZOOM_VERT },
    'Peruvian Quad': { name: 'Peruvian', vert: PERUVIAN_VERT },
    'Tram': { name: 'Tram', vert: TRAM_VERT },
}

export const getSnowBirdLiftName = (liftName) => {
    if (liftName in SNOWBIRD_LIFTS) {
        return SNOWBIRD_LIFTS[liftName].name;
    }
    return "UNKNOWN BIRD LIFT";
}

export const getSnowBirdVert = (liftName) => {
    if (liftName in SNOWBIRD_LIFTS) {
        return SNOWBIRD_LIFTS[liftName].vert;
    }
    return 0;
}

export const isSnowBirdLift = (liftName) => {
    if (liftName in SNOWBIRD_LIFTS) {
        return true;
    }
    return false;
}