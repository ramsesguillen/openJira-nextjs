import { AddCircleOutlineOutlined, SaveAsOutlined } from "@mui/icons-material"
import { Box, Button, TextField } from "@mui/material"
import { useState, ChangeEvent, useContext } from "react"
import { EntriesContext } from "../../context/entries"
import { UIContext } from "../../context/ui"



export const NewEntry = () => {

  const { addNewEntry } = useContext( EntriesContext );
  const { setIsAddingEntry,  isAddingEntry } = useContext( UIContext );

  // const [isAdding, setIsAdding] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false)


  const onTextChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    setInputValue(event.target.value);
  }


  const onSave = () => {
    if (inputValue.length === 0 ) return;
    addNewEntry( inputValue );
    setIsAddingEntry( false );
    setTouched( false );
    setInputValue('');
  }


  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>

      {
        isAddingEntry
          ? (
            <>
              <TextField
                fullWidth
                sx={{  marginTop: 2, marginBottom: 1 }}
                placeholder='Nueva entrada'
                autoFocus
                multiline
                label='Nueva entrada'
                helperText={ inputValue.length <= 0 && touched && 'Ingrese un valor'}
                error={ inputValue.length <= 0 && touched }
                value={inputValue}
                onChange={onTextChange}
                onBlur={ () => setTouched(true) }
              />
              <Box display='flex' justifyContent='space-between'>
                <Button
                  variant='text'
                  onClick={() => setIsAddingEntry(false) }
                >
                  Cancelar
                </Button>
                <Button
                  variant='outlined'
                  color="secondary"
                  endIcon={ <SaveAsOutlined />}
                  onClick={onSave}
                >
                  Guardar
                </Button>
              </Box>
            </>
          )
          : (
            <Button
                startIcon={ <AddCircleOutlineOutlined /> }
                fullWidth
                variant="outlined"
                onClick={() => setIsAddingEntry(true) }
              >
                Agregar tarea
              </Button>
          )

      }

    </Box>
  )
}