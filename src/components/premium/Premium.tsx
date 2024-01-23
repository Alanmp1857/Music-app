import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import AppBlockingIcon from "@mui/icons-material/AppBlocking";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import DevicesIcon from "@mui/icons-material/Devices";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";

// Premium component
const Premium = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "80%",
        marginLeft: "250px",
      }}>
      {/* Section: The Power of Premium */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <div>
          <h3>The Power of Premium</h3>
        </div>

        {/* Features display */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}>
          {/* Feature: Ad-free music listening */}
          <div
            style={{
              margin: 20,
              display: "flex",
              flexDirection: "column",
              height: "200px",
              width: "350px",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50%",
              }}>
              <AppBlockingIcon sx={{ fontSize: 60 }} />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "50%",
              }}>
              <h4 style={{ margin: 0 }}>Ad free music listening</h4>
              <p style={{ textAlign: "center", lineHeight: 1.5 }}>
                Enjoy uninterrupted listening to your favourite songs
              </p>
            </div>
          </div>

          {/* Feature: Offline playback */}
          <div
            style={{
              margin: 20,
              display: "flex",
              flexDirection: "column",
              height: "200px",
              width: "350px",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50%",
              }}>
              <LibraryMusicIcon sx={{ fontSize: 60 }} />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "50%",
              }}>
              <h4 style={{ margin: 0 }}>Offline playback</h4>
              <p style={{ textAlign: "center", lineHeight: 1.5 }}>
                Save your data by listening offline by downloading unlimited
                songs
              </p>
            </div>
          </div>

          {/* Feature: Play everywhere */}
          <div
            style={{
              margin: 20,
              display: "flex",
              flexDirection: "column",
              height: "200px",
              width: "350px",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50%",
              }}>
              <DevicesIcon sx={{ fontSize: 60 }} />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "50%",
              }}>
              <h4 style={{ margin: 0 }}>Play everywhere</h4>
              <p style={{ textAlign: "center", lineHeight: 1.5 }}>
                Listen on your speakers, TV, and all other devices
              </p>
            </div>
          </div>

          {/* Feature: Create playlist */}
          <div
            style={{
              margin: 20,
              display: "flex",
              flexDirection: "column",
              height: "200px",
              width: "350px",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50%",
              }}>
              <QueueMusicIcon sx={{ fontSize: 60 }} />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "50%",
              }}>
              <h4 style={{ margin: 0 }}>Create playlist</h4>
              <p style={{ textAlign: "center", lineHeight: 1.5 }}>
                Create unlimited playlist of your favourite songs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Plans */}
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {/* Card: Music Free */}
        <Box width={250} margin={5}>
          <Card sx={{ backgroundColor: "#474747", borderRadius: 3 }}>
            <CardContent
              sx={{
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}>
              <Typography variant="h5" sx={{ marginBottom: 2, textIndent: 5 }}>
                Music Free
              </Typography>

              <Typography variant="body2">
                <ul style={{ listStyle: "none" }}>
                  <li style={{ margin: 2 }}>
                    <p
                      style={{
                        display: "flex",
                        textAlign: "center",
                        alignItems: "center",
                      }}>
                      <DoneIcon />
                      <span style={{ paddingLeft: 10 }}>Shuffle Play</span>
                    </p>
                  </li>
                  <li style={{ margin: 2 }}>
                    <p
                      style={{
                        display: "flex",
                        textAlign: "center",
                        alignItems: "center",
                      }}>
                      <ClearIcon />
                      <span style={{ paddingLeft: 10 }}>Ad Free</span>
                    </p>
                  </li>
                  {/* Additional features */}
                  {/* ... */}
                </ul>
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  width: "100%",
                  "&:hover": { backgroundColor: "#626262", color: "white" },
                }}>
                Free
              </Button>
            </CardActions>
          </Card>
        </Box>

        {/* Card: Starter Pack */}
        <Box width={250} margin={5}>
          <Card sx={{ backgroundColor: "#474747", borderRadius: 3 }}>
            <CardContent
              sx={{
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}>
              <Typography variant="h5" sx={{ marginBottom: 2, textIndent: 5 }}>
                Starter Pack
              </Typography>

              <Typography variant="body2">
                <ul style={{ listStyle: "none" }}>
                  <li style={{ margin: 2 }}>
                    <p
                      style={{
                        display: "flex",
                        textAlign: "center",
                        alignItems: "center",
                      }}>
                      <DoneIcon />
                      <span style={{ paddingLeft: 10 }}>Shuffle Play</span>
                    </p>
                  </li>
                  <li style={{ margin: 2 }}>
                    <p
                      style={{
                        display: "flex",
                        textAlign: "center",
                        alignItems: "center",
                      }}>
                      <DoneIcon />
                      <span style={{ paddingLeft: 10 }}>Ad Free</span>
                    </p>
                  </li>
                  {/* Additional features */}
                  {/* ... */}
                </ul>
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  width: "100%",
                  "&:hover": { backgroundColor: "#626262", color: "white" },
                }}>
                ₹ 100 (30 days)
              </Button>
            </CardActions>
          </Card>
        </Box>

        {/* Card: Premium */}
        <Box width={250} margin={5}>
          <Card sx={{ backgroundColor: "#474747", borderRadius: 3 }}>
            <CardContent
              sx={{
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}>
              <Typography variant="h5" sx={{ marginBottom: 2, textIndent: 5 }}>
                Premium
              </Typography>

              <Typography variant="body2">
                <ul style={{ listStyle: "none" }}>
                  <li style={{ margin: 2 }}>
                    <p
                      style={{
                        display: "flex",
                        textAlign: "center",
                        alignItems: "center",
                      }}>
                      <DoneIcon />
                      <span style={{ paddingLeft: 10 }}>Shuffle Play</span>
                    </p>
                  </li>
                  <li style={{ margin: 2 }}>
                    <p
                      style={{
                        display: "flex",
                        textAlign: "center",
                        alignItems: "center",
                      }}>
                      <DoneIcon />
                      <span style={{ paddingLeft: 10 }}>Ad Free</span>
                    </p>
                  </li>
                  {/* Additional features */}
                  {/* ... */}
                </ul>
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  width: "100%",
                  "&:hover": { backgroundColor: "#626262", color: "white" },
                }}>
                ₹ 599 (365 days)
              </Button>
            </CardActions>
          </Card>
        </Box>
      </div>
    </div>
  );
};

export default Premium;
