angular.module('augc-app.services', ['ngResource'])

.factory('Post', function ($resource) {
    return $resource(
    'http://aga.com/app_dev.php/api/news/posts/:postId' + '.json',
    { page: 1, enabled: 1 },
    {'query': { method: 'GET', isArray: false }}
    );
});

