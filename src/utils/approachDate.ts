const currentYear = new Date().getFullYear();

export const approachDate = (date: Array<any>) => {
    let arr: any = [];
    let approachDate = '';

    if (date) {
        date.map(d => {
            arr.push(d.close_approach_date_full)

            for (let i = 0; i < 100; i++) {
                if (d.close_approach_date_full.includes((currentYear + i).toString())) {
                    approachDate = d.close_approach_date_full;
                }
                if (approachDate) break;
            }
        })
    }
    return approachDate;
};
