import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';
import ModalCustom from '../../components/ModalCustom';
import DialogViewData from '../../components/DialogViewData';
import { IconButton } from '@mui/material';
import { getItembyUser } from '../../API/API';
import CardList from '../../components/CardList';
import { Add } from '@mui/icons-material';

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
  return (
    <div>
      <Switch location={background || location}>
        <Route exact path='/admin' children={<PageView />} />
      </Switch>
      {background && <Route path='/admin/create' component={Modal} />}
      {background && (
        <Route path='/admin/post/:id' component={DialogViewData} />
      )}
      {background && <Route path='/admin/edit/:id' component={ModalEdit} />}
    </div>
  );
}

function PageView() {
  let location = useLocation();
  const history = useHistory();
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
  }
  useEffect(() => {
    loadItemList();
  }, []);

  const parentClick = (item) => {
    console.log('parent', item);
    history.push({
      pathname: `/admin/post/${item.id}`,
      state: { background: location },
      data: { item },
    });
  };
  const handleEdit = (item) => {
    console.log(item);
    history.push({
      pathname: `/admin/edit/${item.id}`,
      state: { background: location },
      data: { item },
    });
  };
  const createItem = () => {
    history.push({
      pathname: `/admin/create`,
      state: { background: location },
    });
  };

  return (
    <div>
      <CardList
        itemList={itemList}
        parentClick={parentClick}
        handleEdit={handleEdit}
        loading={loading}
        noData={noData}
        noLikeButton={true}
      />
      <div
        style={{
          position: 'sticky',
          bottom: 20,
        }}
      >
        <IconButton
          sx={{ bgcolor: 'primary.main', color: 'white' }}
          size='large'
          onClick={createItem}
        >
          <Add fontSize='inherit' />
        </IconButton>
      </div>
    </div>
  );
}

function Modal() {
  let userId = JSON.parse(localStorage.getItem('user')).id;
  return <ModalCustom userId={userId} />;
}
function ModalEdit(props) {
  let userId = JSON.parse(localStorage.getItem('user')).id;
  return <ModalCustom userId={userId} forEdit={true} {...props} />;
}
