import React from 'react'
import { List, ListItem, ListItemText} from '@material-ui/core';

const usuarios = [
    {id: 1, label: 'Usuário'}
]

export default ({
}) => (
    <List>
    {usuarios.map((row) => (
      <ListItem button key={row.id}>
        <ListItemText primary={row.label} />
      </ListItem>
    ))}
  </List>
)