const { catchAsyncErrors } = require("../../utils/catchAsync");
const { getAllFun } = require("../Handlers/handler.factory");
const childModel = require("./child.model");
const standardModel = require("../Standard/standard.model");
const getAge = require("../../utils/getAge");
const vaccineModel = require("../Vaccine/vaccine.model");
const cloudinary = require("../../utils/cloudinary");
const Chart = require('chart.js');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

//create new baby
exports.addChild = catchAsyncErrors(async (req, res) => {
    if (req.file && req.file.path) {
      const image =await  cloudinary.uploader.upload(req.file.path , {folder: "children"})
      req.body.childPic =  image.secure_url;
    }
    req.body.parentID = req.user._id;
    let child = new childModel(req.body);
    const { weight,headDiameter,height} = req.body;
    const childAge = getAge(child.birthDate);
    const childAgeInMonths = (childAge.years * 12) + childAge.months;
    
    const newMeasurement = {
      weight,
      headDiameter,
      height,
      age:childAgeInMonths
    }
    child.measurements.push(newMeasurement)
    const upcomingVaccines = await vaccineModel.find({ age: { $gte: childAgeInMonths } });
    upcomingVaccines.forEach(vaccine => {
      child.vaccines.push(vaccine._id);
    });
    await child.save();
    res.status(200).json({child,message:"You have been added your child Successfully..."});
});
// update baby
exports.updateChild = catchAsyncErrors(async (req, res)=>{
  const {childID} = req.params;
  const child = await childModel.findById(childID);
  const parentId = req.user._id;
  if(child.parentID.equals(parentId)){
    if (req.file && req.file.path) {
      // Delete the old image if it exists
      if (child.childPic) {
        const public_id = child.childPic.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`children/${public_id}`);
      } 
      const image =await  cloudinary.uploader.upload(req.file.path , {folder: "children"})
      req.body.childPic =  image.secure_url;
    }
    let updatedChild = await childModel.findByIdAndUpdate(childID, req.body,{new:true} );
    if (!updatedChild) {
        return next(new AppError(`child Not Found To Update`, 404));
    }
    res.status(200).json({ message: `child has Been Updated`  , updatedChild});
  }
  else {
    res.status(404).json({message: "You do not have permission to update this children."});
  }
})
//mark vaccine as taken
exports.takeVaccine = catchAsyncErrors(async (req, res)=>{
  const {vaccineID , childID} = req.params;
  const parentID = req.user._id;
  const child = await childModel.findById(childID);
  if (child.parentID.equals(parentID)){ 
      child.vaccines.pull(vaccineID);
      child.takenVaccines.push(vaccineID);
      await child.save();
      res.status(200).json({ message: `vaccine has been taken` , child});
  }
  else {
      res.status(404).json({message: "You do not have permission to mark this vaccine for this child."});
    }
  
})
//Delete baby
exports.deleteChild = catchAsyncErrors(async (req, res)=>{
  const {childID} = req.params;
  let child = await childModel.findById(childID)
  let parentId = req.user._id;
  if(child.parentID.equals(parentId)){
    // Delete the old image if it exists
    if (child.childPic) {
      const public_id = child.childPic.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`children/${public_id}`);
    }
    let document = await childModel.findByIdAndDelete(childID);
    if (!document) {
      return next(new AppError(`child Not Found To Update`, 404));
    }
    res.status(200).json({ message: `this child has Been deleted`  , document});
  }
  else {
    res.status(404).json({message: "You do not have permission to deelte this children."});
  }
  
})
//get upcoming children vaccines
exports.childUpComingVaccines = catchAsyncErrors(async (req, res) => {
  const {childID} = req.params;
  const child = await childModel.findById(childID);
  const childAge = getAge(child.birthDate);
  const childAgeInMonth = (childAge.years * 12) + childAge.months;
  console.log(childAge);
  const UpComingVaccines = await vaccineModel.find({age: {$gte:childAgeInMonth} });
  if(UpComingVaccines){
  res.status(200).json({ UpComingVaccines });
  }
  else{
    res.status(404).json({message: "your child has not upComing Vaccines"});
  }
});
//Get All babies
exports.getChildren = getAllFun(childModel);
//Get Specific baby
exports.getChild = catchAsyncErrors(async (req, res)=>{
  const {childID} = req.params;
  let child = await childModel.findById(childID);
  const childAge = getAge(child.birthDate);
  const childAgeInMonth = (childAge.years * 12) + childAge.months ;
  let parentId = req.user._id;
  if(child.parentID.equals(parentId)){
    let document = await childModel.findById(childID).populate('vaccines').populate('takenVaccines');
    if (!document) {
      return next(new AppError(`child Not Found`, 404));
    }
    res.status(200).json({ document,AgeInMonths: childAgeInMonth,Age:childAge});
  }
  else {
    res.status(404).json({message: "You do not have permission to get this child."});
  }

})
//Add new Measurement for baby
exports.addChildMeasurement = catchAsyncErrors(async(req,res)=>{
  const {childID} = req.params;
  const child = await childModel.findById(childID);
  const childAge = getAge(child.birthDate);
  const childAgeInMonth = (childAge.years * 12) + childAge.months ;
  const { weight,headDiameter,height,age} = req.body;
  const parentId = req.user._id;
  if(child.parentID.equals(parentId)){
    if (age > childAgeInMonth) {
      res.status(401).json({message:'You are not allowed to enter new measurement Age bigger than your child age'})
    } else {
      const newMeasurement = {
        weight,
        headDiameter,
        height,
        age
      }
      // Check if measurements array contains an object with the same age
      const measurementExists = child.measurements.some((measurement) => measurement.age === age);
  
      if (measurementExists) {
        res.status(400).json({message: 'Measurement with the same age already exists'});
      }
  
      child.measurements.push(newMeasurement);
      await child.save();
  
      res.status(200).json({message: 'Measurement added successfully',data: child});
      }
    }
    
});
//update specific measurement
exports.updateChildMeasurement = catchAsyncErrors(async (req, res) => {
  const { childID, measurementID } = req.params;
  const child = await childModel.findById(childID);
  const { weight, headDiameter, height } = req.body;
  const parentId = req.user._id;
  if (child.parentID.equals(parentId)) {
    // Find the index of the measurement in the measurements array
    const measurementIndex = child.measurements.findIndex((measurement) => measurement._id.equals(measurementID));
    if (measurementIndex === -1) {
      return res.status(404).json({message: 'Measurement not found'});
    }
    // Update the measurement with the new values
    child.measurements[measurementIndex].weight = weight;
    child.measurements[measurementIndex].headDiameter = headDiameter;
    child.measurements[measurementIndex].height = height;

    await child.save();

    res.status(200).json({message: 'Measurement updated successfully',data: child});
  }
});
// generate bar Chart Reports
exports.generateChartReport = catchAsyncErrors(async (req, res) => {
  const { childID } = req.params;
  const child = await childModel.findById(childID);

  // Get the list of measurements for the child
  const measurements = child.measurements;

  // Initialize the biggest measurement age value
  let biggestMeasurement = {
    weight: 0,
    headDiameter: 0,
    height: 0,
    age: 0,
  };

  // Loop through the measurements and find the biggest measurement age
  measurements.forEach((measurement) => {
    if (measurement.age > biggestMeasurement.age) {
      biggestMeasurement = measurement;
    }
  });

  const childStandard = await standardModel.findOne({
    age: biggestMeasurement.age,
    gender: child.gender,
  });

  // Generate chart data for weight
  const weightChartData = {
    labels: ['Weight'],
    datasets: [
      {
        label: 'Child',
        backgroundColor: '#4fc3f7',
        borderColor: '#2196f3',
        borderWidth: 2,
        data: [biggestMeasurement.weight],
      },
      {
        label: 'Standard',
        backgroundColor: '#ffc107',
        borderColor: '#ff9800',
        borderWidth: 2,
        data: [childStandard.weight],
      },
    ],
  };

  // Generate chart data for height
  const heightChartData = {
    labels: ['Height'],
    datasets: [
      {
        label: 'Child',
        backgroundColor: '#81c784',
        borderColor: '#4caf50',
        borderWidth: 2,
        data: [biggestMeasurement.height],
      },
      {
        label: 'Standard',
        backgroundColor: '#f06292',
        borderColor: '#e91e63',
        borderWidth: 2,
        data: [childStandard.height],
      },
    ],
  };

  // Generate chart data for head diameter
  const headChartData = {
    labels: ['Head Diameter'],
    datasets: [
      {
        label: 'Child',
        backgroundColor: '#9575cd',
        borderColor: '#673ab7',
        borderWidth: 2,
        data: [biggestMeasurement.headDiameter],
      },
      {
        label: 'Standard',
        backgroundColor: '#aed581',
        borderColor: '#8bc34a',
        borderWidth: 2,
        data: [childStandard.headDiameter],
      },
    ],
  };

  // Create chart options
  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        display: true,
        
        ticks: {
          color: '#666',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
      y: {
        display: true,
        ticks: {
          color: '#666',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
    },
  };

  // Add unit labels to chart axes
  weightChartData.labels[0] += ' (grams)';
  heightChartData.labels[0] += ' (cm)';
  headChartData.labels[0] += ' (cm)';

  // Create an instance of ChartJSNodeCanvas
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: 400, height: 300 });

  // Generate the weight chart image
  const weightChartImage = await chartJSNodeCanvas.renderToDataURL({
    type: 'bar',
    data: weightChartData,
    options: chartOptions,
  });

  // Generate the height chart image
  const heightChartImage = await chartJSNodeCanvas.renderToDataURL({
    type: 'bar',
    data: heightChartData,
    options: chartOptions,
  });

  // Generate the head diameter chart image
  const headChartImage = await chartJSNodeCanvas.renderToDataURL({
    type: 'bar',
    data: headChartData,
    options: chartOptions,
  });

  // Return the chart images in the response
  res.status(200).json({
    weightChartImage,
    heightChartImage,
    headChartImage,
  });
});
//generate line chart report for child measurements
async function generateChartImage(label, labels, childData, standardData, chartOptions, chartJSNodeCanvas,color1,color2) {
  chartOptions.data = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: childData,
        borderColor: color1,
        fill: false,
      },
      {
        label: 'Standard',
        data: standardData,
        borderColor: color2,
        fill: false,
      },
    ],
  };

  // Render the chart image
  const chartImage = await chartJSNodeCanvas.renderToDataURL(chartOptions);
  return chartImage;
};
exports.generateLineChartReport = async (req, res) => {
  const { childID } = req.params;
  const width = 800; // Width of the chart image
  const height = 600; // Height of the chart image

  // Find the child and its measurements
  const child = await childModel.findById(childID);
  const childMeasurements = child.measurements;
  let smallestChildAge = Infinity;

  // Loop through the measurements and find the smallest measurement age
  childMeasurements.forEach((measurement) => {
    if (measurement.age < smallestChildAge) {
      smallestChildAge = measurement.age;
    }
  });

  // Find the standard measurements based on the child's gender
  const childGender = child.gender;
  const standardMeasurements = await standardModel.find({ age: { $gte: smallestChildAge }, gender: childGender });

  // Extract the relevant data for the charts
  const labels = childMeasurements.map((measurement) => measurement.age);
  const childHeightData = childMeasurements.map((measurement) => measurement.height);
  const childWeightData = childMeasurements.map((measurement) => measurement.weight);
  const childHeadDiameterData = childMeasurements.map((measurement) => measurement.headDiameter);
  const standardHeightData = standardMeasurements.map((measurement) => measurement.height);
  const standardWeightData = standardMeasurements.map((measurement) => measurement.weight);
  const standardHeadDiameterData = standardMeasurements.map((measurement) => measurement.headDiameter);

  // Configure the chart options
  const chartOptions = {
    type: 'line',
    options: {
      responsive: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Age (months)',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Measurement Value',
          },
        },
      },
    },
  };

  // Create an instance of ChartJSNodeCanvas
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

  // Generate the chart images for height, weight, and head diameter
  const heightChartImage = await generateChartImage('Child Height', labels, childHeightData, standardHeightData, chartOptions, chartJSNodeCanvas,'blue', 'lightblue');
  const weightChartImage = await generateChartImage('Child Weight', labels, childWeightData, standardWeightData, chartOptions, chartJSNodeCanvas,'green', 'lightgreen');
  const headDiameterChartImage = await generateChartImage('Child Head Diameter', labels, childHeadDiameterData, standardHeadDiameterData, chartOptions, chartJSNodeCanvas,'re');

  // Return the chart images in the response
  res.status(200).json({ heightChartImage, weightChartImage, headDiameterChartImage });
};

