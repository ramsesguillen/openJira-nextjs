import { SaveAltOutlined, DeleteOutlineOutlined } from "@mui/icons-material"
import { Button, capitalize, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from "@mui/material"
import { ChangeEvent, FC, useContext, useMemo, useState } from "react";
import { Layout } from "../../components/layouts"
import { Entry, EntryStatus } from "../../interfaces"
import { GetServerSideProps } from 'next'
import { isValidObjectId } from "mongoose";
import { dbEntries } from "../../database";
import { EntriesContext } from "../../context/entries";
import { dateFunctions } from "../../utils";



const validStatus: EntryStatus[] = ["pending","in-progress",'finished'];

interface Props {
  entry: Entry;
}


const EntryPage: FC<Props> = ({entry}) => {

  const { updateEntry } = useContext(EntriesContext)

  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [touched, setTouched] = useState(false)

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

  const onTextChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    setInputValue(event.target.value);
  }


  const onStatusChanged = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setStatus(event.target.value as EntryStatus);
  }

  const onSave = () => {
    if ( inputValue.length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    }
    updateEntry(updatedEntry, true);
  }


  return (
    <Layout title={inputValue.substring(0, 20) + '...'}>
      <Grid
        container
        justifyContent={'center'}
        sx={{ marginTop: 2 }}
      >
        <Grid item xs={12} sm={8} md={8}>
          <Card>
            <CardHeader
              title={`Entrada: ${inputValue}`}
              subheader={'Creada ' + dateFunctions.getFormatDistanceToNow(entry.createdAt)}
            />

            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1}}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onChange={onTextChange}
                helperText={ isNotValid && 'Ingrese un valor'}
                onBlur={ () => setTouched(true)}
                error={isNotValid}
              />

              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup
                  value={status}
                  onChange={onStatusChanged}
                  row
                >
                  {
                    validStatus.map( option => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={capitalize(option)}
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActions>
              <Button
                startIcon={ <SaveAltOutlined />}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={ inputValue.length <= 0  }
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton sx={{
        position:"fixed",
        bottom: 30,
        right: 30,
        backgroundColor: 'red'
      }}>
        <DeleteOutlineOutlined />
      </IconButton>
    </Layout>
  )
}



export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const {id} = params as { id: string };

  if (!isValidObjectId(id)) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const entry = await dbEntries.getEntryById(id);


  return {
    props: {
      entry
    }
  }
}

export default EntryPage;