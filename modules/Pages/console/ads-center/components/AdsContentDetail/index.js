import React from 'react';
import { Button, Card } from '@material-ui/core';
import { Typography, Stack } from '@mui/material';
import { ButtonDropdown } from '../';

const AdsContentDetailComponent = ({ 
    status, setShowModal, showModal, buttonColor, setButtonColor, setStatus
}) => {

    return (
      <>
        <Card style={{ padding: '2em', height: '100%' }}>
          {
            status === 'Tinjau' ?
            <ButtonDropdown 
              status={status}
              setStatus={setStatus}
              setShowModal={setShowModal}
              showModal={showModal}
              buttonColor={buttonColor}
              setButtonColor={setButtonColor}
            />
            :
            <Button 
              variant="container" 
               disabled
              style={{ backgroundColor: buttonColor.background, color: '#fff'}}
            >
              {status}
            </Button>
          }

          <div className='my-4'>
            <img 
              src="/images/thumbnail_yt.png" 
              style={{ cursor: 'pointer' }} 
              onClick={() => {
                setShowModal({
                  ...showModal,
                  show: true,
                  type: 'media'
                })
              }}
            />
          </div>

          <div>
            <Stack direction="row" spacing={1}>
              <Typography
                fontFamily={'Lato'}
                color="rgba(0, 0, 0, 0.38)"
              >
                Pembuatan Iklan:
              </Typography>
            
              <Typography
                fontFamily={'Lato'}
                color="secondary"
                fontWeight="bold"
              >
                @ikeaindonesia
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Typography
                fontFamily={'Lato'}
                color="rgba(0, 0, 0, 0.38)"
              >
                Judul:
             </Typography>
            
              <Typography
                fontFamily={'Lato'}
              >
                IKEA - Let's Relax
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Typography
                fontFamily={'Lato'}
                color="rgba(0, 0, 0, 0.38)"
              >
                Objektifitas:
              </Typography>
            
              <Typography
                fontFamily={'Lato'}
              >
                Lalu-lintas
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Typography
                fontFamily={'Lato'}
                color="rgba(0, 0, 0, 0.38)"
              >
                Demografis:
              </Typography>
            
              <Typography
                fontFamily={'Lato'}
                color="secondary"
                fontWeight="bold"
              >
                @ikeaindonesia
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Typography
                fontFamily={'Lato'}
                color="rgba(0, 0, 0, 0.38)"
              >
                Situs Link:
              </Typography>
                
              <Typography
                fontFamily={'Lato'}
                color="secondary"
              >
                www.IKEA.id
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Typography
                fontFamily={'Lato'}
                color="rgba(0, 0, 0, 0.38)"
              >
                Tipe Iklan:
              </Typography>
            
              <Typography
                fontFamily={'Lato'}
              >
                @ikeaindonesia
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Typography
                fontFamily={'Lato'}
                color="rgba(0, 0, 0, 0.38)"
              >
                Rencana Penayangan:
              </Typography>
            
              <Typography
                fontFamily={'Lato'}
              >
                @ikeaindonesia
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Typography
                fontFamily={'Lato'}
                color="rgba(0, 0, 0, 0.38)"
              >
                Penempatan Iklan:
              </Typography>
            
              <Typography
                fontFamily={'Lato'}
              >
                @ikeaindonesia
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Typography
                fontFamily={'Lato'}
                color="rgba(0, 0, 0, 0.38)"
              >
                Kredit Tersisa:
              </Typography>
            
              <Typography
                fontFamily={'Lato'}
              >
                1.000
              </Typography>
            </Stack>
          </div>
        </Card>
      </>
    )
};

export default AdsContentDetailComponent;