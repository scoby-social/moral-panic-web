import { Box, Card, Grid, Typography } from "@mui/material";
import Image from "next/image";
import {
  container,
  featuredCardMetadata,
  featuredCardStyles,
  featuredImageContainer,
  image,
  pageWrapper,
} from "./styles";

const ForgeMain = () => {
  return (
    <Box sx={pageWrapper}>
      <Box sx={container}>
        <Card sx={featuredCardStyles}>
          <Grid container>
            <Grid item md={6} xs={12}>
              <Box sx={featuredImageContainer}>
                <Image
                  src="https://storage.googleapis.com/hellbenders-public-c095b-assets/hellbendersWebAssets/compass_rose_example.png"
                  style={image}
                  fill
                  alt="Compass Rose"
                />
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box>
                <Typography variant="h3" color="primary">
                  {"COMPASS ROSE"}
                </Typography>
                <Typography variant="h6" color="primary">
                  Guidance
                </Typography>
                <Typography variant="subtitle2">
                  {
                    "The Quest of the Compass Rose is a point of entry into Hellbenders: Moral Panic!, a massively-multiplayer Web3 game available on xNFT Backpack and the Solana Saga phone, an outlaw biker gang of amphibious superheroes. Activate your Compass Rose to play Hellbenders: Moral Panic!, our. "
                  }
                </Typography>

                <Grid container my={3}>
                  <Grid item md={4} xs={12}>
                    <Box>
                      <Typography variant="subtitle2" color="primary">
                        {"Author"}
                      </Typography>
                      <Typography variant="subtitle2">
                        {
                          "A stunning photograph of a sunset over the ocean, taken at a beach in Hawaii."
                        }
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item md={4} xs={6}>
                    <Box>
                      <Typography variant="subtitle2" color="primary">
                        {"Creation Date"}
                      </Typography>
                      <Typography variant="subtitle2">
                        {"2023-03-05"}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item md={4} xs={6}>
                    <Box>
                      <Typography variant="subtitle2" color="primary">
                        {"File Size"}
                      </Typography>
                      <Typography variant="subtitle2">{"800 KB"}</Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={featuredCardMetadata}>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {"Symbol"}
                    </Typography>
                    <Typography variant="subtitle2">{"ROSE"}</Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {"Family Name"}
                    </Typography>
                    <Typography variant="subtitle2">{"Mapshifting"}</Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {"Collection Name"}
                    </Typography>
                    <Typography variant="subtitle2">
                      {"Compass Rose"}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {"Background"}
                    </Typography>
                    <Typography variant="subtitle2">{"Parent"}</Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {"External URL"}
                    </Typography>
                    <Typography variant="subtitle2">
                      {"https://quest.hellbenders.world"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
      <Box></Box>
    </Box>
  );
};

export default ForgeMain;
