import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isAuthSuccess, setIsAuthSuccess] = React.useState(false);
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

  React.useEffect(
    () => {
      api.getMe()
          .then((user) => {
            setIsLoggedIn(true);
            setUserEmail(user.email);
            history.push('/');
          })
          .catch((err) => console.log(err));
    },
    [history]
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

  React.useEffect(() => {
    console.debug("load initial data");
    Promise.all([fetchUserInfo(), fetchCards()])
      .then(
        (data) => {
          const [userInfo, cards] = data;
          setCurrentUser(userInfo);
          setCards(cards);
        })
      .catch((err) => console.error(err));
  }, []);

  const handleRegister = (userData) => {
    api.signUp(userData)
      .then(() => {
          setIsAuthSuccess(true);
          history.push('/');
      })
      .catch(err => {
        console.log(err);
        setIsAuthSuccess(false);
      })
      .finally(() => setIsInfoTooltipActive(true)); 
  }

  const handleLogin = (userData) => {
    api.signIn(userData)
      .then(() => {
        api.getMe()
          .then((user) => {
            setUserEmail(user.email);
            setIsLoggedIn(true);
            history.push('/');
          })
          .catch((err) => {
            console.log(err);
            setIsAuthSuccess(false);
            setIsInfoTooltipActive(true);
          });
        })
        .catch((err) => {
          console.log(err);
          setIsAuthSuccess(false);
          setIsInfoTooltipActive(true);
        }); 
  }

  const handleLogout = () => {
    api.signOut()
      .then(() => {
        setUserEmail('');
        setIsLoggedIn(false);
        history.push('/sign-in');
      })
      .catch((err) => console.log(err)); 
  }

  const fetchCards = () => {
    return api
      .getCards()
      .then((items) => Promise.resolve(items))
      .catch(() => Promise.reject("Failed to fetch cards."));
  }

  const fetchUserInfo = () => {
    return api
      .getUserInfo()
      .then((userInfo) => Promise.resolve(userInfo))
      .catch(() => Promise.reject("Failed to set user info."));
  };

  const handleCardLike = (card) => {
    const isLiked = card.isUserLiked;
    const setLike = isLiked ? api.unlike.bind(api) : api.like.bind(api);

    setLike(card._id)
      .then(
        (newCard) => {
          setCards(c => c.map((item) => item._id === card._id ? newCard : item));
        }
      )
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
      .then(
        (newCard) => {
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
      .then(
        (userInfo) => {
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
      .then(
        (userInfo) => {
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
        .then(
          () => {
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
          <ProtectedRoute exact path="/"
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
          <Route path="/sign-up">
            <Register handleRegister = {handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
        </Switch>
        <Footer />
      </div>
      <InfoTooltip
        isActive = {isInfoTooltipActive}
        isSuccess = {isAuthSuccess}
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
