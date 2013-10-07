/*
 * Main view for the portal
 */

//To edit the time display
function checkTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
};

// Convert a drug_id to a symbol
function replaceDrugId(id) {
	switch (id) {
	case 1:
		return "A";
	case 2:
		return "B";
	case 3:
		return "C";
	case 4:
		return "D";
	default:
		return "unknown";
	}
	;
};

// Convert day from number to words
function replaceDay(day) {
	switch (day) {
	case "1":
		return "M";
	case "2":
		return "T";
	case "3":
		return "W";
	case "4":
		return "Th";
	default:
		return "F";
	}
	;
}

//Function to add if the drug on that day and that time is taken or not
function checkIsTaken(schedule, isTaken, content) {
	if (isTaken) {
		content += "<td class='cell-padded-taken'><p>" + schedule.drug_id + "</p>" + schedule.time_of_day + "</td>";
	} else {
		content += "<td class='cell-padded-notTaken'><p>" + schedule.drug_id + "</p>" + schedule.time_of_day + "</td>";
	}
	return content;
}

define([
// These are path alias that we configured in our bootstrap
'jquery', 'underscore', 'backbone', 'text!view/template/dosageVerification-template.html', 'bootstrapLib', // do
// not
// need
// to
// include
// in
// parameters
// list
'd3' // do not need to include in parameters list

], function($, _, Backbone, dosageVerificationTemplate) {
	var DosageView = Backbone.View
			.extend({
				template : _.template(dosageVerificationTemplate),

				// Event for button, text, etc if there are
				events : function() {
				},

				// initialization
				initialize : function() {
					// Set the current clock and date
					this.showClock();
					this.showDate();
					setInterval(this.showClock, 1000);
					setInterval(this.showDate, 1000);

					// To check if the device is on/not, here assume it is on.
					$("#deviceStatusIndicator").addClass("btn-primary");

					// To display the Today medication; indicate whether it has
					// been done or not
					var todayDoses = $(".todayDoses");
					// This supposed to get from database, but due to
					// demonstration purpose, it is skipped
					var doses = [ {
						doses : "Drug A (1), drug B (1), drug C (1), drug D(4)"
					}, {
						doses : "Drug A (1), drug B (1), drug C (1)"
					}, {
						doses : "Drug A (1), drug B (1)"
					}, {
						doses : "Drug A (1)"
					}, {
						doses : "Drug A (1), drug B (1), drug D(4)"
					}, ];

					var timeTaken = [ {
						content : "18:00 pm"
					}, {
						content : "18:30 pm"
					}, {
						content : "19:00 pm"
					}, {
						content : "19:30 pm"
					}, {
						content : "19:30 pm"
					} ];
					todayDoses.append("<th>No. </th><th>Dosage Time</th>");

					// Show pills record
					for ( var i = 0; i < 5; i++) {
						content = timeTaken[i].content;
						dosebtn = i;
						var medicationInfo = {
							dosebtn : dosebtn,
							doses : doses[i].doses,
							doseNo : i,
							buttonType : "btn-danger",
							content : content
						};
						todayDoses.append(this.template(medicationInfo));
					}
					;

					// Socket.io communication. When a signal from the device is
					// received in server-side, the server will "tell" client
					// here.
					var that = this;
					var numA = 0; // A fake indicator
					this.socket = io.connect("127.0.0.1:3000");
					this.socket.on("connect", function() {
						console.log("Client socket.io is establisted");

						// Emit to the server to get information
						that.socket.emit("getAdherenceRecord");

						// When we receive the record from mysql database,
						// processing it and generate a table
						that.socket.on("receiveRecord", function(drug_schedule, adherenceEvent) {
							// console.log("Get the
							// data:"+JSON.stringify(drug_schedule.length));
							that.showPillsTakingRecord(drug_schedule, adherenceEvent);
						});

						// Change the button color to reveal that dosage is
						// taken
						that.socket.on("deleteA", function(result) {
							if (!numA > 0) {
								// To check the device signal code, i.e.
								// 000000,111111,...etc
								if (result == "000000") {
									that.showAlert("A prescription is finished!");
									$("button[name=0]").removeClass("btn-danger");
									$("button[name=0]").addClass("btn-success");
									numA++;
								} else if (result == "111111") {
									that.showAlert("A prescription is finished!");
									$("button[name=1]").removeClass("btn-danger");
									$("button[name=1]").addClass("btn-success");
								} else if (result == "222222") {
									that.showAlert("A prescription is finished!");
									$("button[name=2]").removeClass("btn-danger");
									$("button[name=2]").addClass("btn-success");
								} else if (result == "333333") {
									that.showAlert("A prescription is finished!");
									$("button[name=3]").removeClass("btn-danger");
									$("button[name=3]").addClass("btn-success");
								} else if (result == "444444") {
									that.showAlert("A prescription is finished!");
									$("button[name=4]").removeClass("btn-danger");
									$("button[name=4]").addClass("btn-success");
								}
								;
							}
						});
					});
				},

				// Show the alert when a dosage is done
				showAlert : function(message) {
					$('#alertNotice').html(
							'<div class="alert"><a class="close" data-dismiss="alert">×</a><span>' + message
									+ '</span></div>');
				},

				// Show the current clock
				showClock : function() {
					var today = new Date();
					var h = today.getHours();
					var m = checkTime(today.getMinutes());
					var s = checkTime(today.getSeconds());
					time = h + ":" + m + ":" + s;
					$(".clock").html(time);
				},

				// Show the current date
				showDate : function() {
					var today = new Date();
					date = today.toDateString();
					$(".date").html(date);
				},

				// Show a table about what dosages the patient took last week.
				showPillsTakingRecord : function(drug_schedule, adherence) {
					// preprocessing the drug_schedule
					var fSchedule = []; // the medication schedule
					for ( var i = 0; i < drug_schedule.length; i++) {
						var schedule = drug_schedule[i];

						// To replace drug id for better data processing
						schedule.drug_id = replaceDrugId(schedule.drug_id);

						// To replace day with word
						schedule.day_of_week = replaceDay(schedule.day_of_week);

						// Combine a new drug schedule list
						fSchedule.push({
							drug_id : schedule.drug_id,
							day_of_week : schedule.day_of_week,
							time_of_day : schedule.time_of_day,
							isTaken : false
						});
					}
					;
					for ( var j = 0; j < adherence.length; j++) {
						var adh = adherence[j];
						// conversion
						adh.drug_id = replaceDrugId(adh.drug_id);
					}

					// To compare database adhersion record and the proposed required drug dosage record in order to show which days and times patient took the drugs
					for ( var j = 0; j < adherence.length; j++) {
						var adh = adherence[j];
						// do a bit trick here because of the sample data we
						// have
						if (adh.completed_time) {
							for ( var i = 0; i < fSchedule.length; i++) {
								var fsc = fSchedule[i];
								theTime = new Date(adh.scheduled_time);
								theDay = JSON.stringify(theTime.getDay());

								// Conversion of day
								theDay = replaceDay(theDay);

								// console.log("###"+fsc.day_of_week===theDay);
								theTime = checkTime(theTime.getHours()) + ":" + checkTime(theTime.getMinutes()) + ":"
										+ checkTime(theTime.getSeconds());
								if ((fsc.drug_id == adh.drug_id) && (fsc.time_of_day.toString() == theTime)
										&& (fsc.day_of_week == theDay)) {
									fsc.isTaken = true;
									break;
								}
							}
						}
					}
					;

					// To display the result in table form (can be also rewritten by an additional template) 
					drugTakingRecord = $(".drugTakingRecord tbody");
					theDay = fSchedule[0].day_of_week;
					content = "<tr><td>" + theDay + "</td>";
					for ( var k = 0; k < fSchedule.length; k++) {
						if (theDay != fSchedule[k].day_of_week) {
							content += "</tr>";
							drugTakingRecord.append(content);
							theDay = fSchedule[k].day_of_week;
							content = "<tr><td>" + theDay + "</td>";

							// To check if the drug that time and that time is taken or not and display corresponding information
							content = checkIsTaken(fSchedule[k], fSchedule[k].isTaken, content);
						} else {
							content = checkIsTaken(fSchedule[k], fSchedule[k].isTaken, content);
						}
					}
					drugTakingRecord.append(content);
					drugTakingRecord.append("</tr>");
				},
			});

	return DosageView;

});