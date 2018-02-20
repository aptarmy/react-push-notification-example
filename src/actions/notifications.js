import store from '../store';

const notificationsAction = {
  // get called after application started by /project-folder/index.js file
  registerWorker() {
    if('serviceWorker' in navigator && 'PushManager' in window) {
      console.log('Service worker and Push is suuported');
      store.dispatch({ type: 'NOTIFICATION_UPDATE_BROWSER_SUPPORTED', payload: true });
      navigator.serviceWorker.register('/workers/pushNotifications.js')
        .then((swReg) => {
          console.log('ServiceWorker is registered', swReg);
          store.dispatch({ type: 'NOTIFICATION_UPDATE_REGISTERED_WORKER', payload: true });
          store.dispatch({ type: 'NOTIFICATION_UPDATE_SERVICE_WORKER', payload: swReg });
          this.updateUserSubscription();
        })
        .catch((error) => {
          console.log('ServiceWorker Error', error);
          store.dispatch({ type: 'NOTIFICATION_UPDATE_REGISTERED_WORKER', payload: false });
        });
    } else {
      console.warn('Push messaging is not supported');
      store.dispatch({ type: 'NOTIFICATION_UPDATE_BROWSER_SUPPORTED', payload: false });
    }
  },
  // get called by this.registerWorker
  updateUserSubscription() {
    store.getState().notifications.serviceWorker.pushManager.getSubscription()
    .then(function(subscription) {
      if(subscription) {
        console.log('User is subscribed');
        store.dispatch({ type: 'NOTIFICATION_UPDATE_SUBSCRIPTION', payload: subscription });
      }
      if(!subscription) {
        console.log('User is NOT subscribed');
        store.dispatch({ type: 'NOTIFICATION_UPDATE_SUBSCRIPTION', payload: false });
        if(Notification.permission === 'denied') {
          store.dispatch({ type: 'NOTIFICATION_UPDATE_ENABLED_NOTIFICATION', payload: false });
        }
      }
    });
  },
  // get called after click event in template file
  registerSubscription() {
    if(store.getState().notifications.serviceWorker) {
      const applicationServerKey = this.urlB64ToUint8Array(store.getState().notifications.vapidPublicKey);
      store.getState().notifications.serviceWorker.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey
        })
        .then(function(subscription) {
          console.log('User is subscribed');
          store.dispatch({ type: 'NOTIFICATION_UPDATE_ENABLED_NOTIFICATION', payload: true });
          store.dispatch({ type: 'NOTIFICATION_UPDATE_SUBSCRIPTION', payload: subscription });
        })
        .catch(function(error) {
          console.warn('Failed to subscribe the user: ', error);
          store.dispatch({ type: 'NOTIFICATION_UPDATE_ENABLED_NOTIFICATION', payload: false });
          store.dispatch({ type: 'NOTIFICATION_UPDATE_SUBSCRIPTION', payload: false });
        });
    }
  },
  // get called after click event in template file
  unregisterSubscription() {
    store.getState().notifications.serviceWorker.pushManager.getSubscription()
      .then(function(subscription) {
        if(subscription) {
          return subscription.unsubscribe();
        }
      })
      .catch(function(error) {
        console.log('Error unsubscribing:', error);
      })
      .then(function() {
        console.log('User was unsubsribed');
        store.dispatch({ type: 'NOTIFICATION_UPDATE_SUBSCRIPTION', payload: false });
      });
  },
  // used by this.registerSubscription to reform Vapid public key
  urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}

export default notificationsAction;
