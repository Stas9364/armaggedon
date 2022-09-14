const currentYear = new Date().getFullYear();

type ApproachDataType = {
    close_approach_date: string
    close_approach_date_full: string
    epoch_date_close_approach: number
    miss_distance: {
        astronomical: string
        kilometers: string
        lunar: string
        miles: string
    }
    orbiting_body: string
    relative_velocity: {
        kilometers_per_hour: string
        kilometers_per_second: string
        miles_per_hour: string
    }
}

export const approachDataObject = (data: Array<ApproachDataType>): ApproachDataType  => {
    let approachDate = '';
    let approachData = {} as ApproachDataType;

    if (data) {
        data.map((d) => {
            for (let i = 0; i < 100; i++) {
                if (d.close_approach_date_full.includes((currentYear + i).toString())) {
                    approachDate = d.close_approach_date_full;
                    approachData = d
                }
                if (approachDate) break;
            }
        })
    }
    return approachData;
};
