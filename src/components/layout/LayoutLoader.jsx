import { Grid2 as Grid, Skeleton } from '@mui/material'
import React from 'react'

const layoutLoader = () => {
  return (
    <Grid container spacing={"2rem"}>
        <Grid 
            size={
                {
                    xs:12,
                    sm:6,
                    md:8
                }
            }
            height={"100%"}
        >
            <Skeleton variant='rectangular' height={"100%"} />
        </Grid>
        <Grid
            size={
                {
                    sm:6,
                    md:4
                }
            }
            sx={
              {
                display: {
                    xs:"none",
                    sm:"block"
                  }
              }
            }
            height={"100%"}
        >
            <Skeleton variant='rectangular' height={"100%"} />
        </Grid>
    </Grid>
  )
}

export default layoutLoader