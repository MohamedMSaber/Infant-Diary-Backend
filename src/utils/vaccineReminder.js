const Parent = require('../components/User/Parent/parent.model');
const Child = require('../components/Child/child.model');
const Vaccine = require('../components/Vaccine/vaccine.model');
const getAge = require('./getAge');
const sendEmail = require('./sendEmail');
const schedule = require('node-schedule');

async function vaccineReminder() {
    const children = await Child.find();
    for (const child of children) {
        const parentid = child.parentID;
        const childAge = getAge(child.birthDate);
        const childAgeInMonth = (childAge.years * 12) + childAge.months ;
        if (childAge.days == 0) {
            const parent = await Parent.findOne({ _id: parentid });
            const parentEmail = parent.email;
            const vaccine = await Vaccine.findOne({age: {$eq: childAgeInMonth}});
            if (vaccine) {
                const subject = `Reminder: ${vaccine.name} due for your baby ${child.name}`;   
                const htmlBody = `<h1>Dear ${parent.name},\n\nThis is a reminder that your baby ${child.name} is due for the ${vaccine.name} vaccine .\n\nBest regards,\nThe Vaccine Reminder Team</h1>`;
                await sendEmail(parentEmail , htmlBody, subject);
            }
        }
       

       
    }
}


const sendVaccineReminder = () => {
    schedule.scheduleJob('0 19 * * *', async () => {
      console.log('Sending vaccine Reminders...');
      await vaccineReminder();
    });
};
  

module.exports = sendVaccineReminder;

