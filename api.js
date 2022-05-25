let axios = require("axios");
const { async } = require("q");
let url = "https://jsonmock.hackerrank.com/api/football_matches";

async function getWinnerTotalGoals(competition, year) {
  let winnings = [];
  let results = await axios.get(
    url + "?competition=" + competition + "&year=" + year
  );
  let page_total = results.data.total_pages;

  for (let i = 0; i < page_total + 1; i++) {
    let page_results = await axios.get(
      url + "?competition=" + competition + "&year=" + year + "&page=" + i
    );
    page_results.data.data.map((x) => {
      if (parseInt(x.team1goals) > parseInt(x.team2goals)) {
        if (winnings.filter((y) => y.team === x.team1).length > 0) {
          let index = winnings[winnings.map((y) => y.team).indexOf(x.team1)];
          index.goals = index.goals + parseInt(x.team1goals);
        } else winnings.push({ team: x.team1, goals: parseInt(x.team1goals) });
      } else if (parseInt(x.team2goals) > parseInt(x.team1goals)) {
        if (winnings.filter((y) => y.team === x.team2).length > 0) {
          let index = winnings[winnings.map((x) => x.team).indexOf(x.team2)];
          index.goals = index.goals + parseInt(x.team2goals);
        } else winnings.push({ team: x.team2, goals: parseInt(x.team2goals) });
      } else if (parseInt(x.team1goals === x.team2goals)) {
        if (winnings.filter((y) => y.team === x.team2).length > 0) {
          let index = winnings.map((x) => x.team).indexOf(x.team2);
          winnings.index.goals = index.goals + parseInt(x.team2goals);
        } else winnings.push({ team: x.team2, goals: parseInt(x.team2goals) });
        if (winnings.filter((y) => y.team === x.team1).length > 0) {
          let index = winnings[winnings.map((y) => y.team).indexOf(x.team1)];
          index.goals = index.goals + parseInt(x.team1goals);
        } else winnings.push({ team: x.team1, goals: parseInt(x.team1goals) });
      }
    });
  }
  winnings.sort((a, b) => b.goals - a.goals);
  return winnings[0].goals;
}

getWinnerTotalGoals("UEFA Champions League", 2011)
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
