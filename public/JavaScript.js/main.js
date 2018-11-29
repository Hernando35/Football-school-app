let app = new Vue({
	el: "#schemageneral",
	data: {
		video: "",
		data: [],
		teamPoints: [],
		allLocations: [],
		places: [],
		months: ["Januari", "Februari", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		buttonBack: [
			{
				"page": "home"
			}
		],
		datesOctober: [],
		datesSeptember: [],
		players: [],
		coach: "",
		teams: [],
		creator: '',
		createPost: '',
		showHome: true,
		showAllTeamInfo: false,
		show: false,
		showSchedule: false,
		showTable: false,
	},

	created: function () {
		this.getData();
	},

	methods: {
		getData: function () {
			fetch("https://api.myjson.com/bins/hqcl6")
				.then(response => response.json())
				.then(function (json) {
					app.data = json;
					app.myButton();
					app.places = app.data[0].locations;
					app.teams = app.data[0].teams;
					app.allLocations = app.data[0].locations;
					app.datesOctober = app.data[0].schedule.october;
					app.datesSeptember = app.data[0].schedule.september;
					app.getAddress();
				})
				.catch(error => console.error('Error:', error));
		},
		myButton: function () {
			let x = document.getElementById("myLinks");
			if (x.style.display === "none") {
				x.style.display = "block";
			} else {
				x.style.display = "none";
			}
		},

		showMonth: function () {
			$("#myID").slideToggle();
		},

		showScheduleSeptember: function () {
			this.show = true;
			this.showSchedule = true;
			this.showHome = false;
			this.showAllTeamInfo = false;
			this.showTable = false;

		},

		showScheduleOctober: function () {
			this.show = true;
			this.showSchedule = false;
			this.showHome = false;
			this.showAllTeamInfo = false;
			this.showTable = false;
		},

		showSixMaps: function () {
			this.show = false;
			this.showSchedule = true;
			this.showHome = false;
			this.showAllTeamInfo = false;
			this.showTable = false;

		},

		sixTeams: function () {
			this.show = false;
			this.showSchedule = false;
			this.showHome = false;
			this.showAllTeamInfo = false;
			this.showTable = false
			this.getAddress();
		},

		showTeamInfo: function (team) {
			this.show = false;
			this.showSchedule = false;
			this.showHome = false;
			this.showAllTeamInfo = true;
			this.showTable = false;
			this.showInfo(team);
		},
		
		showStatistics: function () {
			this.show = false;
			this.showSchedule = false;
			this.showHome = false;
			this.showAllTeamInfo = false;
			this.showTable = true;
			this.tablePoints();
		},

		showInfo: function (value) {
			for (let i = 0; i < this.data[0].teams.length; i++) {
				if (this.data[0].teams[i].name === value) {
					this.players = this.data[0].teams[i].team;
					this.coach = this.data[0].teams[i].coach;
				}
			}
		},

		tablePoints: function (data) {
            let orderedPoints = this.data[0].teams;
            orderedPoints.sort(function(a, b) {
              return b.points - a.points;
            })
			for (let i = 0; i < this.data[0].teams.length; i++) {
				this.teamPoints = this.data[0].teams[i].points;
			}
		},

		getLogo: function (id) {
			let src;
			for (let i = 0; i < this.data[0].teams.length; i++) {
				let team = this.data[0].teams[i];
				if (id === team.name) {
					src = team.logo;
				}
			}
			return src;
		},

		getAddress: function (id) {
			let html;
			for (let i = 0; i < this.data[0].locations.length; i++) {
				let teams = this.data[0].locations[i];
				let address = this.data[0].locations[i].address;
				let maps = this.data[0].locations[i].map;
				if (id === teams.name) {
					html = teams.address;
				}
			}
			return html;
		},
        
        backToHome: function () {
            window.location.reload(true);
        }
        
        
	},

})
