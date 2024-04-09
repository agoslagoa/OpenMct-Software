function getDictionary() {
    return http.get('/nautilusDicitionary.json')
        .then(function (result) {
            //console.log(result.data)
            return result.data;
        });
}

var objectProvider = {
    get: function (identifier) {
        return getDictionary().then(function (dictionary) {
            //console.log(identifier)
            if (identifier.key === 'ros2') {
                return {
                    identifier: identifier,
                    name: dictionary.name,
                    type: 'folder',
                    location: 'ROOT'
                };
            }
             else if (identifier.key !== 'spacecraft') {
                var measurement = dictionary.measurements.filter(function (m) {
                    return m.key === identifier.key;
                })[0];
                return {
                    identifier: identifier,
                    name: measurement.name,
                    type: 'example.telemetry',
                    telemetry: {
                        values: measurement.values
                    },
                    location: 'ros2-test:ros2'
                };
            }
        });
    }
};

var compositionProvider = {
    appliesTo: function (domainObject) {
        return domainObject.identifier.namespace === 'ros2-test' &&
               domainObject.type === 'folder';
    },
    load: function (domainObject) {
        return getDictionary()
            .then(function (dictionary) {
                return dictionary.measurements.map(function (m) {
                    return {
                        namespace: 'ros2-test',
                        key: m.key
                    };
                });
            });
    }
};

var Ros2Dictionary = function (openmct) {
    return function install(openmct) {
        openmct.objects.addRoot({
            namespace: 'ros2-test',
            key: 'ros2'
        });

        openmct.objects.addProvider('ros2-test', objectProvider);

        openmct.composition.addProvider(compositionProvider);

        openmct.types.addType('example.telemetry', {
            name: 'Example Telemetry Point',
            description: 'Example telemetry point from our happy tutorial.',
            cssClass: 'icon-telemetry'
        });
    };
};

