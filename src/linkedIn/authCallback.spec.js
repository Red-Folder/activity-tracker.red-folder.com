import React from 'react';
import AuthCallback from './authCallback.js';
import { shallow } from 'enzyme';

describe('LinkedIn Authorisation Callback should', () => {
    it('render an error if parameters are not provided', () => {
        const wrapper = shallow(<AuthCallback />);

        expect(wrapper.contains(<h2>An error receiving parameters fron LinkedIn has occurred</h2>)).toBeTruthy();
    })

    it('render an error if non error callback is missing state', () => {
        const location = {
            search: '?code=abc'
        };
        const wrapper = shallow(<AuthCallback location={location} />);

        expect(wrapper.contains(<h2>An error receiving parameters fron LinkedIn has occurred</h2>)).toBeTruthy();
    })

    it('render an error if non error callback is missing code', () => {
        const location = {
            search: '?state=abc'
        };
        const wrapper = shallow(<AuthCallback location={location} />);

        expect(wrapper.contains(<h2>An error receiving parameters fron LinkedIn has occurred</h2>)).toBeTruthy();
    })

    it('render an error if callback is missing error and code', () => {
        const location = {
            search: '?invalid=very'
        };
        const wrapper = shallow(<AuthCallback location={location} />);

        expect(wrapper.contains(<h2>An error receiving parameters fron LinkedIn has occurred</h2>)).toBeTruthy();
    })


    it('render an error if user cancels login', () => {
        const location = {
            search: '?error=user_cancelled_login&error_description=User cancelled login'

        };
        const wrapper = shallow(<AuthCallback location={location} />);

        expect(wrapper.contains(<h2>Authentication cancelled due to user login cancellation</h2>)).toBeTruthy();
    })

    it('render an error if user cancels authorisation', () => {
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

        it('make a request for an access token', () => {
            fetch.mockResponseOnce(JSON.stringify());

            const location = {
                search: '?code=abc&state=123'
            };
            const wrapper = shallow(<AuthCallback location={location} />);
    
            expect(fetch.mock.calls.length).toEqual(1);
            expect(fetch.mock.calls[0][0]).toEqual('http://localhost:7071/api/RequestLinkedInAccessToken');
        })

        it('make a request for an access token should include the code and redirect', () => {
            fetch.mockResponseOnce((request) => {
                console.log(request);
                return JSON.stringify();
            });

            const location = {
                search: '?code=abc&state=123'
            };
            const wrapper = shallow(<AuthCallback location={location} />);
    
            expect(fetch.mock.calls[0])
            expect(fetch.mock.calls.length).toEqual(1);
            expect(fetch.mock.calls[0][0]).toEqual('http://localhost:7071/api/RequestLinkedInAccessToken');
        })
    })
})