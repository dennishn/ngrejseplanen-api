export const sendNotification = functions.database.ref('/users/{userUid}/notifications/{notificationUid}').onWrite(event => {
    console.log('WAFAK');
    const userUid = event.params.userUid;
    const notificationUid = event.params.notificationUid;

    // No data === user un-registeret his reminder
    if(!event.data.val()) {
        return console.log(`User ${userUid} unregistered his notification reminder`);
    }

    console.log(`We have a new User Notification UID ${notificationUid} for user: ${userUid}`);

    const getDeviceTokensPromise = admin.database().ref(`/users/${userUid}/notifications`).once('value');
    const getUserProfilePromise = admin.auth().getUser(userUid);

    return Promise.all([getDeviceTokensPromise, getUserProfilePromise]).then(([deviceTokens, userProfile]) => {

        if (!deviceTokens.hasChildren()) {
            return Promise.reject('There are no notification tokens to send to.');
        }

        console.log(`There are ${deviceTokens.numChildren()} tokens to send notifications to`);
        console.log(`Fetched user profile: ${userProfile}`);

        const payload = {
            notification: {
                title: 'HEJ FRA MIG TIL DIG',
                body: `Du skal nå din bus n00b`,
                icon: userProfile.photoURL
            }
        };

        const tokens = Object.keys(deviceTokens.val());

        return admin.messaging().sendToDevice(tokens, payload).then((response) => {
            // for each msg check if there was an error
            const tokensToRemove: Array<any> = [];

            response.results.forEach((result, index) => {
                const error = result.error;

                if(error) {
                    console.error('Failure sending notification to', tokens[index], error);

                    if (error.code === 'messaging/invalid-registration-token' ||
                        error.code === 'messaging/registration-token-not-registered') {
                        tokensToRemove.push(deviceTokens.ref.child(tokens[index]).remove());
                    }

                }

            });

            return Promise.all(tokensToRemove);

        });
    });
});