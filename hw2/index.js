const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
    
    var sex;
    var bucket;
    var key;
    var statusCode = 200;
    var data;
    
    if (event.body) {
        let body = JSON.parse(event.body)
        sex = body.sex;
        bucket = body.bucket;
        if (sex == "male")
            key = "male_adv_list.txt";
        else
            key = "female_adv_list.txt";
    
        try {
            const params = {
                Bucket: bucket,
                Key: key,
            };
            data = await s3.getObject(params).promise();
            data = data.Body.toString('utf-8');
        } catch (error) {
            console.log(error);
            statusCode = 404;
            data = "get file failed";
        }
    }
    else {
        data = "invalid arguments";
        statusCode = 404;
    }
    
    const response = {
        statusCode: statusCode,
        body: data,
    };
    
    return response;
};
