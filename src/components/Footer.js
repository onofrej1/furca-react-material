import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

class Footer extends Component {
  render() {
    return (
      <Grid container className="footer">
        <Grid item md />
        <Grid item md={5} className="p-4">
          <div style={{ verticalAlign: "middle" }}>
            <p>
              O5 bežecký klub FURČA <br />
              Tokajícka 2, 040 22 Košice Mobil: 0904 246 060<br />
              E-mail: bohunek.zdenek@maratonfurca.sk<br />
            </p>
          </div>
        </Grid>
        <Grid item md={5} className="p-4">
          <div className="float-right p-3 footer-contact">
            <span>
              webstránka:<span className="glyphicon glyphicon-envelope" />
              erikonofrej@maratonfurca.sk
            </span>{" "}
            <a href="http://www.toplist.sk/" target="_top">
              <img
                src="http://toplist.sk/count.asp?id=1254971&logo=mc"
                border="0"
                alt="TOPlist"
                width="88"
                height="60"
              />
            </a>
          </div>
        </Grid>
        <Grid item md />
      </Grid>
    );
  }
}

export default Footer;
