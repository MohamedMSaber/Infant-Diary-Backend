const Parent = require('../components/User/Parent/parent.model');
const Child = require('../components/Child/child.model');
const Vaccine = require('../components/Vaccine/vaccine.model');
const getAge = require('./getAge');
const sendEmail = require('./sendEmail');
const schedule = require('node-schedule');

async function updatData(){
    const children = await Child.find();
    for (const child of children) {
        const parentid = child.parentID;
        const childAge = getAge(child.birthDate);
        const childAgeInMonth = (childAge.years * 12) + childAge.months ;
        if (childAge.days == 0) {
            const parent = await Parent.findOne({ _id: parentid });
            const parentEmail = parent.email;
            const subject = `Reminder: ${child.name} has be completed ${childAgeInMonth} months ❤️`;   
            const htmlBody = `<h1>Dear ${parent.name},\n\nThis is a reminder that your baby ${child.name} has be completed ${childAgeInMonth} months.\n\nplease updata your child data.\n\nBest regards,\nThe Vaccine Reminder Team</h1>`;
            await sendEmail(parentEmail , htmlBody, subject);
        
        }
    }
}

const sendUpdateData = () => {
    schedule.scheduleJob('0 0 9 * * *', async () => {
      console.log('Sending update Child Data Reminders...');
      await updatData();
    });
};

module.exports = sendUpdateData;