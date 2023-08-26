// @ts-nocheck
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../services/redux/store.ts";
import {ProfileCard} from './profileCard.tsx';
import {Addresses} from './Addresses.tsx';
import Mapir from 'mapir-react-component';

const Map = Mapir.setToken({
  transformRequest: (url) => {
    return {
      url: url,
      headers: {
        'x-api-key':
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijc4MDg2YTNhYjAwZDJiNTg2MDk3NjQ1YzIxNmNmZDE5MDU2ZjBkZWQ3MGNiNzRkOWM1MGZkYmE5Zjk2YTgxODY1NmU3MDUyYWFjOTBlNGY2In0.eyJhdWQiOiIyMzc2OCIsImp0aSI6Ijc4MDg2YTNhYjAwZDJiNTg2MDk3NjQ1YzIxNmNmZDE5MDU2ZjBkZWQ3MGNiNzRkOWM1MGZkYmE5Zjk2YTgxODY1NmU3MDUyYWFjOTBlNGY2IiwiaWF0IjoxNjkyNzA0NzUwLCJuYmYiOjE2OTI3MDQ3NTAsImV4cCI6MTY5NTI5Njc1MCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.h1Hmm7iSSWGK1pasJxWf0hp1xr7pvep8d9mzVq9zsjN-BodjQ_kYFXEHQHDfhtBOlEuG1fqpr7MvhH8HgvD8PIymeW3bN78RxH66E0CUyi4sXeyofnDbKJO2tEggqnzfPFGGsC5k2P975dcv4MPL8Y-1vm0ybRmaksbcxOsCG3Vahn1bGHiqzKKe__32G6Cd8ALb7PLZB477KOrsN9kOucA0wXqcx0Swm4LdJ1M2NNAFHevOvQFxJwD1ZmpLp0NH9BwpAKPy49i_jpVkuBG2MnjEWC0p472vjLlisM8yjYVVMF5zQXf_p142DyPIO7LIyV8L5iAfn0N4Xu6so9DnnQ',
        'Mapir-SDK': 'reactjs',
      },
    };
  },
});

export default function Profile() {
  const loggedIn = useAppSelector(state => state.userReducer.isLoggedIn)
  const navigate = useNavigate();
  useEffect(() => {
    if(!loggedIn){
      navigate('/login')
    }
  }, []);
  return (
    <main className="profileMain">
      <ProfileCard />
      <h3>آدرس ها</h3>
      <Addresses />

      {/* <div style={{width: '500px', height: '400px'}}>
        <Mapir Map={Map} userLocation></Mapir>
      </div> */}
    </main>
  );
}
