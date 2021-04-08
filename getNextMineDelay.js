var axios = require("axios");

/* Return number of ms before we can next mine */
const getNextMineDelay = async (account) => {
  var data = JSON.stringify({
    json: true,
    code: "m.federation",
    scope: "m.federation",
    table: "miners",
    table_key: "",
    lower_bound: account,
    upper_bound: account,
    index_position: 1,
    key_type: "",
    limit: 10,
    reverse: false,
    show_payer: false,
  });

  var config = {
    method: "post",
    url: "https://wax.greymass.com/v1/chain/get_table_rows",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  const response = await axios(config);

  const state_res = response.data;

  let ms_until_mine = -1;
  const now = new Date().getTime();
  const delay = 400;

  if (
    state_res.rows.length &&
    state_res.rows[0].last_mine_tx !==
      "0000000000000000000000000000000000000000000000000000000000000000"
  ) {
    const last_mine_ms = Date.parse(state_res.rows[0].last_mine + ".000Z");
    ms_until_mine = last_mine_ms + delay * 1000 - now;

    if (ms_until_mine < 0) {
      ms_until_mine = 0;
    }
  }
  //console.log(`ms until next mine ${ms_until_mine}`);

  return ms_until_mine;
};
module.exports = getNextMineDelay;
