const client = require('mongoose');
const Schema = client.Schema;

async function mongodbConnect() {
  const URL = 'mongodb+srv://flagtick:YiiSHeSJL0rVYpJN@cluster1.5zmyp.mongodb.net/flagtick?retryWrites=true&w=majority';
  client.set('strictQuery', false);
  return await new Promise((resolve) => {
    client.connect(URL,
        { 
          useNewUrlParser: true, 
          useUnifiedTopology: true 
        }
      ).then(function(data) {
        /** Refer document here: https://mongoosejs.com/docs/models.html */
        const UserModel = client.model('User', 
          new Schema(
            { name: String, slug: String }
          ), 
          'users'
        );    
        UserModel.find({}, function(err, data) { 
          if (err !== null) {
              resolve(err);
          } else {
              resolve(data);
          }
        });

      })
      .catch(function (err) {
        console.error('Could not connect to mongo DB', err)
      });
  });
}

exports.handler = async (event) => {
    
    let res = await mongodbConnect();
    
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify(res),
    };
    return response;
};