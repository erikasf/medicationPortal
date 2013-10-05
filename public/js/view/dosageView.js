/*
 * View for the icons in control panel
 */

define([
        // These are path alias that we configured in our bootstrap
        'jquery',     
        'underscore', 
        'backbone',   
        'text!view/template/dosageVerification-template.html',
        'bootstrapLib'

        ], function($, _, Backbone,dosageVerificationTemplate){
	var	DosageView = Backbone.View.extend({
		template: _.template(dosageVerificationTemplate),
		
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
			todayDoses.append("<th>No. </th><th>Dosage Time</th>");
			for (var i=0;i<5;i++){
				timeTaken= "00:00:00";
				content = timeTaken + "Taken";
				dosebtn = i;
				var medicationInfo={dosebtn:dosebtn, doses:"Drug1 x 1; Drug2 x 2",doseNo:i,buttonType:"btn-primary", content:content};
				todayDoses.append(this.template(medicationInfo));
			};
			
		},

		events: {

		},

		//For rendering a view
		render: function(){

			return this; // enable chained calls
		},

		//Show the current clock
		showClock: function(){
			function checkTime(i)
			{
				if (i<10)
				{
					i="0" + i;
				}
				return i;
			};

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

	});


	return DosageView;

});