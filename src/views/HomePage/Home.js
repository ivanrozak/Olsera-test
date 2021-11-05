import React, { useEffect, useState } from 'react';
// import { Card, List, ListItem, IconButton, ListItemText } from '@mui/material';
import { getItems } from '../../API/API';
// import { Favorite, FavoriteBorder } from '@mui/icons-material';
import CardList from '../../components/CardList';
// import ModalCustom from '../../components/ModalCustom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getDataItems, getCommentData } from '../../redux/global/action';

function Home() {
  // const dispatch = useDispatch();
  // const dataBaru = useSelector((state) => state.global.dataState.items);
  const [itemList, setItemList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  // const [trigger, setTrigger] = useState(false);

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

  function loadItemList(page) {
    setLoading(true);

    getItems(page)
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
  // useEffect(() => {
  //   const dataLS = JSON.parse(localStorage.getItem('favourite'));
  //   function compareData() {
  //     const dataItem = itemList;
  //     if (dataLS) {
  //       dataLS.map((item) => {
  //         let data1 = item.id;
  //         dataItem.map((item, index) => {
  //           if (data1 === item.id) {
  //             dataItem[index].liked = 1;
  //           }
  //         });
  //       });
  //     }
  //     setItemList(dataItem);
  //     console.log(itemList, 'yang ni');
  //   }
  //   compareData();
  // }, [trigger]);
  const parentClick = (item) => {
    console.log('parent', item);
  };
  const childClick = (item) => {
    console.log('child', item);
    // let dataNew = [];
    // dataNew = JSON.parse(localStorage.getItem('favourite')) || [];
    // dataNew.push(item);
    // localStorage.setItem('favourite', JSON.stringify(dataNew));
    // setTrigger(!trigger);
  };
  return (
    <div>
      <CardList
        itemList={itemList}
        parentClick={parentClick}
        childClick={childClick}
        loading={loading}
        noData={noData}
      />
    </div>
  );
}

export default Home;
