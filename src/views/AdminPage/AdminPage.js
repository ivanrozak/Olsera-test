import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import ModalCustom from '../../components/ModalCustom';
import DialogViewData from '../../components/DialogViewData';
import { Button } from '@mui/material';
import { getItembyUser } from '../../API/API';
import CardList from '../../components/CardList';

export default function AdminPage() {
  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
}

function ModalSwitch() {
  let location = useLocation();
  let background = location.state && location.state.background;
  console.log(location);
  console.log(background);
  return (
    <div>
      <Switch location={background || location}>
        <Route exact path='/admin' children={<PageView />} />
      </Switch>
      {background && <Route path='/admin/:id' component={Modal} />}
      {background && <Route path='/admin/read' component={DialogViewData} />}
    </div>
  );
}

function PageView() {
  let location = useLocation();
  const [itemList, setItemList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (!noData) {
        loadItemList(page);
      }
    }
  };

  function loadItemList() {
    let userId = JSON.parse(localStorage.getItem('user')).id;
    setLoading(true);
    setTimeout(() => {
      getItembyUser(userId, page)
        .then((res) => {
          const newPage = page + 1;
          const newList = itemList.concat(res.data);
          setItemList(newList);
          setPage(newPage);
          if (res.data.length === 0) {
            setNoData(true);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 2000);
  }
  useEffect(() => {
    loadItemList();
  }, []);

  const parentClick = (item) => {
    console.log('parent', item);
  };

  return (
    <div>
      <CardList
        itemList={itemList}
        parentClick={parentClick}
        loading={loading}
        noData={noData}
        noLikeButton={true}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        <Button
          component={Link}
          to={{
            pathname: `/admin/post`,
            // This is the trick! This link sets
            // the `background` in location state.
            state: { background: location },
          }}
          variant='contained'
        >
          Ini Button
        </Button>
        <Button
          component={Link}
          to={{
            pathname: `/admin/read`,
            // This is the trick! This link sets
            // the `background` in location state.
            state: { background: location },
          }}
          variant='contained'
          onClick={parentClick}
        >
          Read
        </Button>
      </div>
    </div>
  );
}

function Modal() {
  return <ModalCustom />;
}
