import {
    GET_LIST_USERS_PENGUMUMAN,
    CHANGE_CHECKED_STATE_USERS_PENGUMUMAN,
    TOGGLE_SIDEBAR_COLLAPSED,
    GET_CONTACT_COUNTS,
    SET_FILTER_TYPE,
    ADD_NEW_FAQ,
    SELECTED_FAQ,
    UPDATE_SELECTED_FAQ,
    ADD_NEW_INFO,
    SELECTED_INFO,
    UPDATE_SELECTED_INFO
  } from 'modules/Constants/ActionTypes';
import moment from 'moment';

  const INIT_STATE = {
    usersPengumuman: [],
    isSideBarCollapsed: false,
    counter: null,
    filterType: {
        selectedFolder: 'inbox',
        selectedLabel: '',
        searchText: '',
    },
    listFaq: [
      {
          id: 1,
          title: 'Menggunakan Hyppe',
          details: [
              {
                  id: 101,
                  title: 'Buat Akun',
                  created_at: '2022-02-01',
                  body: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                  <p>ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>`
              },
              {
                  id: 102,
                  title: 'Fitur Hyppe',
                  created_at: '2022-02-12',
                  body: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                  <p>ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>`
              }
          ]
      },
      {
        id: 2,
        title: 'Keamanan & Privacy',
        details: [
            {
                id: 101,
                title: 'Laporkan Masalah',
                created_at: '2022-03-02',
                body: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                <p>ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>`
            },
            {
                id: 102,
                title: 'Akun & Keamanan',
                created_at: '2022-03-02',
                body: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                <p>ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>`
            }
        ]
    },
    {
      id: 3,
      title: 'Login & Pemecahan Masalah',
      details: [
          {
              id: 101,
              title: 'Lupa Sandi',
              created_at: '2022-03-11',
              body: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
              <p>ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>`
          }
      ]
  }
    ],
    selectedFaq: null,
    listHyppeInfo: [
        {
            id: 1,
            title: 'Pendaftaran',
            details: [
                {
                    id: 101,
                    title: 'Buat Akun',
                    created_at: '2022-02-01',
                    body: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                    <p>ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>`
                }
            ]
        },
    ],
    selectedInfo: null,
  };

const helpCenterReducers = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_LIST_USERS_PENGUMUMAN: {
            return {
                    ...state,
                    usersPengumuman: action.payload,
                };
            }
        case CHANGE_CHECKED_STATE_USERS_PENGUMUMAN: {
            console.log(action.payload.data);
            let index = state.usersPengumuman.indexOf(action.payload.data);
            state.usersPengumuman[index].check = action.payload.status
            return {
                ...state,
                usersPengumuman: state.usersPengumuman,
            };
        }
        case TOGGLE_SIDEBAR_COLLAPSED: {
            return {
              ...state,
              isSideBarCollapsed: action.payload ? action.payload : !state.isSideBarCollapsed,
            };
          }
        case GET_CONTACT_COUNTS: {
            return {
              ...state,
              counter: action.payload,
            };
          }
        case SET_FILTER_TYPE: {
            return {
                ...state,
                filterType: action.payload,
            };
        }
        case ADD_NEW_FAQ: {
            return {
                ...state,
                listFaq: [...state.listFaq, {title: action.payload,details:[]}],
            };
        }
        case SELECTED_FAQ: {
            return {
                ...state,
                selectedFaq: action.payload,
            };
        }
        case UPDATE_SELECTED_FAQ: {
            let newListFaq = state.listFaq;
            let selectedFaq = state.selectedFaq;
            let selectedIndex = newListFaq.indexOf(selectedFaq);
            
            selectedFaq.details = [
                ...selectedFaq.details,
                {
                    title: action.payload.title,
                    body: action.payload.content,
                    created_at: moment().format('YYYY-MM-DD')
                }
            ];
            newListFaq[selectedIndex] = selectedFaq;

            return {
                ...state,
                listFaq: newListFaq,
            };
        }
        case ADD_NEW_INFO: {
            return {
                ...state,
                listHyppeInfo: [...state.listHyppeInfo, {title: action.payload,details:[]}],
            };
        }
        case SELECTED_INFO: {
            return {
                ...state,
                selectedInfo: action.payload,
            };
        }
        case UPDATE_SELECTED_INFO: {
            let newListInfo = state.listHyppeInfo;
            let selectedInfo = state.selectedInfo;
            let selectedIndex = newListInfo.indexOf(selectedInfo);
            
            selectedInfo.details = [
                ...selectedInfo.details,
                {
                    title: action.payload.title,
                    body: action.payload.content,
                    created_at: moment().format('YYYY-MM-DD')
                }
            ];
            newListInfo[selectedIndex] = selectedInfo;

            return {
                ...state,
                listHyppeInfo: newListInfo,
            };
        }
        default:
            return state;
    }
};
export default helpCenterReducers;