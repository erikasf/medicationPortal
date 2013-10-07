/*
 * View for the icons in control panel
 */

//A common fucntion
function checkTime(i)
{
	if (i<10)
	{
		i="0" + i;
	}
	return i;
};

define([
        // These are path alias that we configured in our bootstrap
        'jquery',     
        'underscore', 
        'backbone',   
        'text!view/template/dosageVerification-template.html',
        'text!view/template/drugTakingRecord-template.html',
        'bootstrapLib',
        'd3'

        ], function($, _, Backbone,dosageVerificationTemplate,drugTakingRecordTemplate){
	var	DosageView = Backbone.View.extend({
		template: _.template(dosageVerificationTemplate),
		drugTakingRecordTemplate: _.template(drugTakingRecordTemplate),

		events:function(){
		},

		//Since view is initialized here, it will not run the parent initialization
		initialize:function(){
			// Set the current clock and date
			this.showClock();
			this.showDate();
			setInterval(this.showClock, 1000);
			setInterval(this.showDate, 1000);

			//To check if the device is on/not, btn-danger
			$("#deviceStatusIndicator").addClass("btn-primary");

			//To display the Today medication; indicate whether it has been done or not
			var todayDoses = $(".todayDoses");
			var doses = [{doses:"Drug A (1), drug B (1), drug C (1), drug D(4)"},
			            {doses:"Drug A (1), drug B (1), drug C (1)"},
			            {doses:"Drug A (1), drug B (1)"},
			            {doses:"Drug A (1)"},
			            {doses:"Drug A (1), drug B (1), drug D(4)"},
			            ];
			
			var timeTaken= [{content:"18:00 pm"},
			                {content:"18:30 pm"},
			                {content:"19:00 pm"},
			                {content:"19:30 pm"},
			                {content:"19:30 pm"}];
			todayDoses.append("<th>No. </th><th>Dosage Time</th>");
			for (var i=0;i<5;i++){
				content = timeTaken[i].content;
				dosebtn = i;
				var medicationInfo={dosebtn:dosebtn, doses:doses[i].doses,doseNo:i,buttonType:"btn-danger", content:content};
				todayDoses.append(this.template(medicationInfo));
			};

			//Show pills record
			var that = this;
			var numA = 0; //A fake indicator
			this.socket = io.connect("127.0.0.1:3000");	
			this.socket.on("connect",function(){
				console.log("Client socket.io is establisted");

				//Emit to the server to get information
				that.socket.emit("getAdherenceRecord");

				//When receive the record from database, processing it and generate a table; need to improve it
				that.socket.on("receiveRecord",function(drug_schedule,adherenceEvent){
					//console.log("Get the data:"+JSON.stringify(drug_schedule.length));
					that.showPillsTakingRecord(drug_schedule,adherenceEvent);				
				});

				//Get the singnal when a drug prescrition is finished
				that.socket.on("deleteA",function(result){
					if (!numA>0){
						//turn off the button
						if (result=="000000"){
							that.showAlert("A prescription is finished!");
							$("button[name=0]").removeClass("btn-danger");
							$("button[name=0]").addClass("btn-success");
							numA++;
						}else if(result=="111111"){
							that.showAlert("A prescription is finished!");
							$("button[name=1]").removeClass("btn-danger");
							$("button[name=1]").addClass("btn-success");
						}else if(result=="222222"){
							that.showAlert("A prescription is finished!");
							$("button[name=2]").removeClass("btn-danger");
							$("button[name=2]").addClass("btn-success");
						}else if(result=="333333"){
							that.showAlert("A prescription is finished!");
							$("button[name=3]").removeClass("btn-danger");
							$("button[name=3]").addClass("btn-success");
						}else if(result=="444444"){
							that.showAlert("A prescription is finished!");
							$("button[name=4]").removeClass("btn-danger");
							$("button[name=4]").addClass("btn-success");
						};
					}
				});
			});
		},

		events: {

		},

		showAlert:function(message){
			$('#alertNotice').html('<div class="alert"><a class="close" data-dismiss="alert">×</a><span>'+message+'</span></div>');
		},

		//For rendering a view
		render: function(){

			return this; // enable chained calls
		},

		//Show the current clock
		showClock: function(){
			var today=new Date();
			var h=today.getHours();
			var m=checkTime(today.getMinutes());
			var s=checkTime(today.getSeconds());
			time = h+":"+m+":"+s;
			$(".clock").html(time);
		},

		//Show the current date
		showDate: function(){
			var today = new Date();
			date = today.toDateString();
			$(".date").html(date);
		},

		//Attach the statistic analysis graphs
		showPillsTakingRecord: function(drug_schedule,adherence){
			//preprocessing the drug_schedule
			var fSchedule =[];	//the medication schedule
			for (var i =0; i<drug_schedule.length;i++){
				var schedule = drug_schedule[i];

				//Convert the drug_id to symbol
				switch (schedule.drug_id){
				case 1: 
					schedule.drug_id = "A";
					break;
				case 2: 
					schedule.drug_id = "B";
					break;
				case 3: 
					schedule.drug_id = "C";
					break;
				case 4: 
					schedule.drug_id = "D";
					break;
				default:
					schedule.drug_id = "unknown";		
				break;
				};

				//Convert the drug_id to symbol
				switch (schedule.day_of_week){
				case "1": 
					schedule.day_of_week = "M";
					break;
				case "2": 
					schedule.day_of_week = "T";
					break;
				case "3": 
					schedule.day_of_week = "W";
					break;
				case "4": 
					schedule.day_of_week = "Th";
					break;
				default:
					schedule.day_of_week = "F";		
				break;
				};

				fSchedule.push({drug_id:schedule.drug_id,day_of_week:schedule.day_of_week,time_of_day:schedule.time_of_day,isTaken:false});
				console.log(JSON.stringify(fSchedule[0]));
			};
			for (var j=0;j<adherence.length;j++){
				var adh=adherence[j];
				//conversion
				switch (adh.drug_id){
				case 1: 
					adh.drug_id = "A";
					break;
				case 2: 
					adh.drug_id = "B";
					break;
				case 3: 
					adh.drug_id = "C";
					break;
				case 4: 
					adh.drug_id = "D";
					break;
				default:
					adh.drug_id = "unknown";		
				break;
				};
			}


			for (var j=0;j<adherence.length;j++){
				var adh=adherence[j];
				//do a bit trick here because of the sample data we have
				if (adh.completed_time){
					for (var i=0;i<fSchedule.length;i++){
						var fsc = fSchedule[i];
						theTime = new Date(adh.scheduled_time);
						theDay = JSON.stringify(theTime.getDay());

						//Conversion
						switch (theDay){						
						case "1": 
							theDay = "M";
							break;
						case "2": 
							theDay = "T";
							break;
						case "3": 
							theDay = "W";
							break;
						case "4": 
							theDay = "Th";
							break;
						default:
							theDay = "F";		
						break;
						};

						//console.log("###"+fsc.day_of_week===theDay);
						theTime = checkTime(theTime.getHours()) + ":"+ checkTime(theTime.getMinutes()) + ":" +checkTime(theTime.getSeconds());
						//console.log("a"+fsc.drug_id);
						//console.log("b"+adh.drug_id);
//						console.log(fsc.time_of_day ==theTime); 
						if ((fsc.drug_id==adh.drug_id) && (fsc.time_of_day.toString() == theTime) && (fsc.day_of_week == theDay)){
							fsc.isTaken = true;
							break;
						}
					}
				}
			};
			console.log("!!!!"+JSON.stringify(fSchedule));
			//fSchedule is ready here
			drugTakingRecord = $(".drugTakingRecord tbody");
			theDay = fSchedule[0].day_of_week;
			content = "<tr><td>" + theDay+"</td>";
			for (var k=0;k<fSchedule.length;k++){
				if (theDay!= fSchedule[k].day_of_week){
					content+="</tr>";
					drugTakingRecord.append(content);
					theDay = fSchedule[k].day_of_week;
					content = "<tr><td>" + theDay+"</td>";

					if (fSchedule[k].isTaken){
						content+="<td class='cell-padded-taken'><p>"+fSchedule[k].drug_id+"</p>"+fSchedule[k].time_of_day+"</td>";						
					}else{
						content+="<td class='cell-padded-notTaken'><p>"+fSchedule[k].drug_id+"</p>"+fSchedule[k].time_of_day+"</td>";
					};					
				}else{
					if (fSchedule[k].isTaken){
						content+="<td class='cell-padded-taken'><p>"+fSchedule[k].drug_id+"</p>"+fSchedule[k].time_of_day+"</td>";						
					}else{
						content+="<td class='cell-padded-notTaken'><p>"+fSchedule[k].drug_id+"</p>"+fSchedule[k].time_of_day+"</td>";
					};
				}
//				console.log(fSchedule[k]);
//				console.log(fSchedule[k].drug_id);
			}					
			drugTakingRecord.append(content);
			drugTakingRecord.append("</tr>");

		},

	});


	return DosageView;

});