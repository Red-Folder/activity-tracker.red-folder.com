import React from 'react';
import AuthCallback from './authCallback.js';
import { shallow } from 'enzyme';

describe('LinkedIn Authorisation Callback should', () => {
    xit('render an error if parameters are not provided', () => {
        const wrapper = shallow(<AuthCallback />);

        expect(wrapper.contains(<h2>An error receiving parameters fron LinkedIn has occurred</h2>)).toBeTruthy();
    })

    xit('render an error if non error callback is missing state', () => {
        const location = {
            search: '?code=abc'
        };
        const wrapper = shallow(<AuthCallback location={location} />);

        expect(wrapper.contains(<h2>An error receiving parameters fron LinkedIn has occurred</h2>)).toBeTruthy();
    })

    xit('render an error if non error callback is missing code', () => {
        const location = {
            search: '?state=abc'
        };
        const wrapper = shallow(<AuthCallback location={location} />);

        expect(wrapper.contains(<h2>An error receiving parameters fron LinkedIn has occurred</h2>)).toBeTruthy();
    })

    xit('render an error if callback is missing error and code', () => {
        const location = {
            search: '?invalid=very'
        };
        const wrapper = shallow(<AuthCallback location={location} />);

        expect(wrapper.contains(<h2>An error receiving parameters fron LinkedIn has occurred</h2>)).toBeTruthy();
    })


    xit('render an error if user cancels login', () => {
        const location = {
            search: '?error=user_cancelled_login&error_description=User cancelled login'

        };
        const wrapper = shallow(<AuthCallback location={location} />);

        expect(wrapper.contains(<h2>Authentication cancelled due to user login cancellation</h2>)).toBeTruthy();
    })

    xit('render an error if user cancels authorisation', () => {
        const location = {
            search: '?error=user_cancelled_authorize&error_description=User did not authorise'

        };
        const wrapper = shallow(<AuthCallback location={location} />);

        expect(wrapper.contains(<h2>Authorisation not given by user</h2>)).toBeTruthy();
    })

    describe('with valid parameters should', () => {
        beforeEach(() => {
            fetch.resetMocks();
        })

        xit('make a request for an access token', () => {
            fetch.mockResponseOnce(JSON.stringify());

            const location = {
                search: '?code=abc&state=123'
            };
            const wrapper = shallow(<AuthCallback location={location} />);
    
            expect(fetch.mock.calls.length).toEqual(1);
            expect(fetch.mock.calls[0][0]).toEqual('http://localhost:7071/api/RequestLinkedInAccessToken');
        })

        xit('make a request for an access token should include the code and redirect', () => {
            fetch.mockResponseOnce(JSON.stringify());

            const location = {
                search: '?code=abc&state=123'
            };
            const wrapper = shallow(<AuthCallback location={location} />);
    
            const jsonRequestedViaFetch = fetch.mock.calls[0][1].body;
            const payloadRequestedViaFetch = JSON.parse(jsonRequestedViaFetch);

            expect(payloadRequestedViaFetch.code).toEqual('abc');
            expect(payloadRequestedViaFetch.redirectUri).toEqual('123');
        })

        describe('while waiting for access token response', () => {
            xit('be in a loading state', () => {
                var promise = new Promise((resolve, reject) => {
                    // Noop - don't resolve
                    // To simulate the state while waiting for the access token reponse
                });
                fetch.mockResponseOnce(() => promise);

                const location = {
                    search: '?code=abc&state=123'
                };
                const wrapper = shallow(<AuthCallback location={location} />);

                expect(wrapper.contains(<p>Loading...</p>)).toBeTruthy();
            })
        })

        describe('on response from access token', () => {
            xit('should redirect to originally requested page', () => {
                fetch.mockResponseOnce(JSON.stringify());

                const location = {
                    search: '?code=abc&state=' + encodeURI('http://test.com/original/target')
                };
                const wrapper = shallow(<AuthCallback location={location} />);

                expect(wrapper.contains(<Redirect to='http://test.com/original/target' />)).toBeTruthy();
            })
        })
    })
})