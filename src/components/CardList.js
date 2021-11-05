import React from 'react';
import { Card, List, ListItem, IconButton, ListItemText } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

function CardList(props) {
  const { itemList, parentClick, childClick, loading, noData, noLikeButton } =
    props;
  return (
    <section>
      <Card>
        <List sx={{ padding: 0, margin: 0 }}>
          {itemList.map((item, i) => (
            <ListItem key={i} className='card-list'>
              <ListItemText
                primary={item.title}
                secondary={item.body}
                onClick={() => parentClick(item)}
              />
              {noLikeButton ? null : (
                <>
                  <IconButton
                    onClick={() => childClick(item)}
                    edge='end'
                    aria-label='delete'
                  >
                    {item.liked ? (
                      <Favorite color='error' />
                    ) : (
                      <FavoriteBorder />
                    )}
                    {/*  */}
                  </IconButton>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </Card>
      {loading ? <div>loading data...</div> : ''}
      {noData ? <div>no data anymore...</div> : ''}
    </section>
  );
}

export default CardList;
