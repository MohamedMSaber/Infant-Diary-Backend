const moment = require('moment');

const getAge = (birthDate)=>{
    
    const birthMoment = moment(birthDate, 'DD/MM/YYYY');
    const currentMoment = moment();

    const years = currentMoment.diff(birthMoment, 'years');
    birthMoment.add(years, 'years');

    const months = currentMoment.diff(birthMoment, 'months');
    birthMoment.add(months, 'months');

    const days = currentMoment.diff(birthMoment, 'days');

    return {years, months, days} ;
}


module.exports = getAge;


