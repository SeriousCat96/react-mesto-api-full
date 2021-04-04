import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './Popups/InfoTooltip';
import AddPlacePopup from './Popups/AddPlacePopup';
import EditAvatarPopup from './Popups/EditAvatarPopup';
import EditProfilePopup from './Popups/EditProfilePopup';
import RemoveCardPopup from './Popups/RemoveCardPopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import { authFailTitle, authSuccessTitle } from '../utils/constants';
import successImg from '../images/success.png';
import failImg from '../images/fail.png';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [authImg, setAuthImg] = React.useState(failImg);
  const [authTitle, setAuthTitle] = React.useState(authFailTitle);
  const [userEmail, setUserEmail] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [cardToRemove, setCardToRemove] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({});

  const [isInfoTooltipActive, setIsInfoTooltipActive] = React.useState(false);
  const [isAddPlacePopupActive, setIsAddPlacePopupActive] = React.useState(false);
  const [isEditAvatarPopupActive, setIsEditAvatarPopupActive] = React.useState(false);
  const [isEditProfilePopupActive, setIsEditProfilePopupActive] = React.useState(false);
  const [isRemoveCardPopupActive, setIsRemoveCardPopupActive] = React.useState(false);
  const [isImagePopupActive, setIsImagePopupActive] = React.useState(false);

  const [isAddCardProcessing, setAddCardProcessing] = React.useState(false);
  const [isEditAvatarProcessing, setEditAvatarProcessing] = React.useState(false);
  const [isEditProfileProcessing, setEditProfileProcessing] = React.useState(false);
  const [isRemoveCardProcessing, setRemoveCardProcessing] = React.useState(false);

  const history = useHistory();

  const fetchUserInfo = React.useCallback(
    () => api
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
        setUserEmail(user.email);
        setIsLoggedIn(true);
        history.push('/');
      }),
    [history]);

  const fetchCards = () => {
    return api
      .getCards()
      .then((cards) => setCards(cards));
  }

  React.useEffect(
    () => fetchUserInfo()
      .then(() => fetchCards())
      .catch((err) => console.log(err)),
    [fetchUserInfo]
  );

  React.useEffect(
    () => {
      const handleEscKeyPressed = (evt) => {
        evt.preventDefault();
    
        if (evt.key === 'Escape') {
          handleCloseAllPopups();
        }
      };

      document.addEventListener('keyup', handleEscKeyPressed);

      return () => document.removeEventListener('keyup', handleEscKeyPressed);
    },
    []
  );

  const handleRegister = (userData) => {
    api.signUp(userData)
      .then(() => {
          setAuthImg(successImg);
          setAuthTitle(authSuccessTitle);
          history.push('/');
      })
      .catch(err => {
        console.log(err);
        setAuthImg(failImg);
        setAuthTitle(authFailTitle);
      })
      .finally(() => setIsInfoTooltipActive(true)); 
  }

  const handleLogin = (userData) => {
    api.signIn(userData)
      .then(() => fetchUserInfo())
      .then(() => fetchCards()
        .catch((err) => console.log(err)))
      .catch(() => {
        setAuthTitle(authFailTitle);
        setIsInfoTooltipActive(true);
      });
  }

  const handleLogout = () => {
    api.signOut()
      .then(() => {
        setUserEmail('');
        setIsLoggedIn(false);
        history.push('/signin');
      })
      .catch((err) => console.log(err)); 
  }

  const handleCardLike = (card) => {
    const isLiked = card.isUserLiked;
    const setLike = isLiked ? api.unlike.bind(api) : api.like.bind(api);

    setLike(card._id)
      .then((newCard) => setCards(c => c.map((item) => item._id === card._id ? newCard : item)))
      .catch((err) => console.error(err));
  };

  const handleAddPlacePopupOpen = () => {
    setIsAddPlacePopupActive(true);
  };

  const handleEditAvatarPopupOpen = () => {
    setIsEditAvatarPopupActive(true);
  };

  const handleEditProfilePopupOpen = () => {
    setIsEditProfilePopupActive(true);
  };

  const handleRemoveCardPopupOpen = (cardToRemove) => {
    setIsRemoveCardPopupActive(true);
    setCardToRemove(cardToRemove);
  };

  const handleImagePopupOpen = (card) => {
    setIsImagePopupActive(true);
    setSelectedCard(card);
  };

  const handleCloseAllPopups = () => {
    setIsInfoTooltipActive(false);
    setIsAddPlacePopupActive(false);
    setIsEditAvatarPopupActive(false);
    setIsEditProfilePopupActive(false);
    setIsRemoveCardPopupActive(false);
    setIsImagePopupActive(false);

    setCardToRemove({});
    setSelectedCard({});
  };

  const handleAddPlace = (values) => {
    setAddCardProcessing(true);

    api
      .addCard(values)
      .then((newCard) => {
          setCards(c => [newCard, ...c]);
          handleCloseAllPopups();
      })
      .catch(() => console.error("Failed to add card."))
      .finally(() => setAddCardProcessing(false));
  };

  const handleEditAvatar = (avatar) => {
    setEditAvatarProcessing(true);

    api
      .setAvatar(avatar)
      .then((userInfo) => {
          setCurrentUser(userInfo);
          handleCloseAllPopups();
      })
      .catch(() => console.error("Failed to edit avatar."))
      .finally(() => setEditAvatarProcessing(false));  
  };

  const handleEditProfile = (userInfo) => {
    setEditProfileProcessing(true);

    api
      .setUserInfo(userInfo)
      .then((userInfo) => {
          setCurrentUser(userInfo);
          handleCloseAllPopups();
      })
      .catch(() => console.error("Failed to edit profile."))
      .finally(() => setEditProfileProcessing(false));  
  };

  const handleCardRemove = () => {
    if(cardToRemove) {
      setRemoveCardProcessing(true);

      api
        .deleteCard(cardToRemove._id)
        .then(() => {
            setCards(c => c.filter((item) => item._id !== cardToRemove._id));
            handleCloseAllPopups();
        })
        .catch(() => console.error("Failed to remove card."))
        .finally(() => setRemoveCardProcessing(false));  
    }
  };

  console.debug("rendering app");
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className = "page">
        <Header isLoggedIn = {isLoggedIn} userEmail = {userEmail} onLogout = {handleLogout} />
        <Switch>
          <ProtectedRoute exact path ="/"
            isLoggedIn = {isLoggedIn}
            onAddPlacePopupOpen = {handleAddPlacePopupOpen}
            onEditAvatarPopupOpen = {handleEditAvatarPopupOpen}
            onEditProfilePopupOpen = {handleEditProfilePopupOpen}
            onRemoveCardPopupOpen = {handleRemoveCardPopupOpen}
            onImagePopupOpen = {handleImagePopupOpen}
            onCardLike = {handleCardLike}
            onLogout = {handleLogout}
            cards = {cards}
            component = {Main}
          />
          <Route path = "/signup">
            <Register handleRegister = {handleRegister} />
          </Route>
          <Route path = "/signin">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path = "*">
            <Redirect to = "/" />
          </Route>
        </Switch>
        <Footer />
      </div>
      <InfoTooltip
        isActive = {isInfoTooltipActive}
        image = {authImg}
        title = {authTitle}
        onClose = {handleCloseAllPopups}
      />
      <AddPlacePopup
        isActive = {isAddPlacePopupActive}
        isProcessing = {isAddCardProcessing}
        onClose = {handleCloseAllPopups}
        onAddPlace = {handleAddPlace}
      />
      <EditAvatarPopup
        isActive = {isEditAvatarPopupActive}
        isProcessing = {isEditAvatarProcessing}
        onClose = {handleCloseAllPopups}
        onEditAvatar = {handleEditAvatar}
      />
      <EditProfilePopup
        isActive = {isEditProfilePopupActive}
        isProcessing = {isEditProfileProcessing}
        onClose = {handleCloseAllPopups}
        onEditProfile = {handleEditProfile}
      />
      <RemoveCardPopup
        isActive = {isRemoveCardPopupActive}
        isProcessing = {isRemoveCardProcessing}
        onClose = {handleCloseAllPopups}
        onCardRemove = {handleCardRemove}
      />
      <ImagePopup
        isActive = {isImagePopupActive}
        selectedCard = {selectedCard}
        onClose = {handleCloseAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
