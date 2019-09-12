# Activity service

_Manage send, accept, decline, cancel stamp_
| <a name="ANCHOR_-1"></a>Quick view  |  |
| ------ | ------ |
| **Activity service** - ***7 APIs*** | **[Import](http://test.onapis.com/Test?cmd=W3siaWQiOiJpZDMxMjE0NzE4MTU2NjI2NzMiLCJuYW1lIjoiW0FjdGl2aXR5IHNlcnZpY2VdIExpc3QgYWN0aXZpdGllcyB3aXRoIHNvcnRpbmcgYmFzZWQgb24gcHJpb3JpdHkgfCBCT1RIIFNFTkRFUiBBTkQgUkVDRUlWRVIgRk9SIFZJTkhQUSIsIl91cmwiOiIvYWN0L0FjdGl2aXR5L0xpc3Q%2FZmllbGRzPXtcIl9pZFwiOjEsIFwic3RhdHVzXCI6MSwgXCJhY2NvdW50X2lkXCI6MX0md2hlcmU9e1wicm9sZVwiOntcIiRpblwiOlsxLDJdfX0mc29ydD17XCJ1cGRhdGVkX2F0XCI6LTF9JnBhZ2U9MSZyZWNvcmRzUGVyUGFnZT0xMCIsIm1ldGhvZCI6IkdFVCIsInVybCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NjEyMS9hY3QvQWN0aXZpdHkvTGlzdD9maWVsZHM9e1wiX2lkXCI6MSwgXCJzdGF0dXNcIjoxLCBcImFjY291bnRfaWRcIjoxfSZ3aGVyZT17XCJyb2xlXCI6e1wiJGluXCI6WzEsMl19fSZzb3J0PXtcInVwZGF0ZWRfYXRcIjotMX0mcGFnZT0xJnJlY29yZHNQZXJQYWdlPTEwIiwiaGVhZGVycyI6W3sia2V5IjoidG9rZW4iLCJ2YWx1ZSI6ImYyYTVhYWUxMWRjOTNiNDJkNjlmODU2ODBmYTM2MmYwIn0seyJrZXkiOiJjb250ZW50LXR5cGUiLCJ2YWx1ZSI6ImFwcGxpY2F0aW9uL2pzb24ifSx7fV0sImJvZHkiOnsianNvbiI6e30sImZvcm0iOlt7fV19LCJub3RlIjoiU0VOREVSOiByb2xlID0gMVxuUkVDRUlWRVI6IHJvbGUgPSAyXG4iLCJyZXNwb25zZSI6eyJoZWFkZXJzIjp7ImNvbnRlbnQtdHlwZSI6ImFwcGxpY2F0aW9uL2pzb24ifSwic3RhdHVzIjoyMDAsImRhdGEiOlt7Il9pZCI6IjVjZjEwMjY1NzdlZmQ0M2JmNDI2NTFiMiIsImFjY291bnRfaWQiOiI1Y2EzMDdmMTZjZDdiZjAwMWE4NDYwMzIiLCJzdGF0dXMiOjR9XX0sImNvbnRlbnRUeXBlIjoiYXBwbGljYXRpb24vanNvbiJ9LHsiaWQiOiJpZDEzNTEyNzE4ODQ1Mjc5OTEuNSIsIm5hbWUiOiJbQWN0aXZpdHkgc2VydmljZV0gTGlzdCBhY3Rpdml0aWVzIHdpdGggc29ydGluZyBiYXNlZCBvbiBwcmlvcml0eSB8IEJPVEggU0VOREVSIEFORCBSRUNFSVZFUiIsIl91cmwiOiIvYWN0L0FjdGl2aXR5P2ZpZWxkcz17XCJfaWRcIjoxLCBcInN0YXR1c1wiOjEsIFwiYWNjb3VudF9pZFwiOjF9JndoZXJlPXtcInJvbGVcIjp7XCIkaW5cIjpbMSwyXX19JnNvcnQ9e1widXBkYXRlZF9hdFwiOi0xfSZwYWdlPTEmcmVjb3Jkc1BlclBhZ2U9MTAiLCJtZXRob2QiOiJHRVQiLCJ1cmwiOiJodHRwOi8vbG9jYWxob3N0OjYxMjEvYWN0L0FjdGl2aXR5P2ZpZWxkcz17XCJfaWRcIjoxLCBcInN0YXR1c1wiOjEsIFwiYWNjb3VudF9pZFwiOjF9JndoZXJlPXtcInJvbGVcIjp7XCIkaW5cIjpbMSwyXX19JnNvcnQ9e1widXBkYXRlZF9hdFwiOi0xfSZwYWdlPTEmcmVjb3Jkc1BlclBhZ2U9MTAiLCJoZWFkZXJzIjpbeyJrZXkiOiJ0b2tlbiIsInZhbHVlIjoiZjJhNWFhZTExZGM5M2I0MmQ2OWY4NTY4MGZhMzYyZjAifSx7ImtleSI6ImNvbnRlbnQtdHlwZSIsInZhbHVlIjoiYXBwbGljYXRpb24vanNvbiJ9LHt9XSwiYm9keSI6eyJqc29uIjp7fSwiZm9ybSI6W3t9XX0sIm5vdGUiOiJTRU5ERVI6IHJvbGUgPSAxXG5SRUNFSVZFUjogcm9sZSA9IDJcbiIsInJlc3BvbnNlIjp7ImhlYWRlcnMiOnsiY29udGVudC10eXBlIjoiYXBwbGljYXRpb24vanNvbiJ9LCJzdGF0dXMiOjIwMCwiZGF0YSI6W3siX2lkIjoiNWNmMTAyNjU3N2VmZDQzYmY0MjY1MWIyIiwiYWNjb3VudF9pZCI6IjVjYTMwN2YxNmNkN2JmMDAxYTg0NjAzMiIsInN0YXR1cyI6NH1dfSwiY29udGVudFR5cGUiOiJhcHBsaWNhdGlvbi9qc29uIn0seyJpZCI6ImlkMjQzMjc0MzY0MTk1NDU0NC41IiwibmFtZSI6IltBY3Rpdml0eSBzZXJ2aWNlXSBHZXQgQWN0aXZpdHkgZGV0YWlscyIsIl91cmwiOiIvYWN0L0FjdGl2aXR5LzphY3RfaWQiLCJtZXRob2QiOiJHRVQiLCJ1cmwiOiJodHRwOi8vbG9jYWxob3N0OjYxMjEvYWN0L0FjdGl2aXR5LzVjZjEwMjY1NzdlZmQ0M2JmNDI2NTFiMj9maWVsZHM9e1wiKlwiOjF9IiwiaGVhZGVycyI6W3sia2V5IjoidG9rZW4iLCJ2YWx1ZSI6ImYyYTVhYWUxMWRjOTNiNDJkNjlmODU2ODBmYTM2MmYwIn0seyJrZXkiOiJjb250ZW50LXR5cGUiLCJ2YWx1ZSI6ImFwcGxpY2F0aW9uL2pzb24ifSx7fV0sImJvZHkiOnsianNvbiI6e30sImZvcm0iOlt7fV19LCJyZXNwb25zZSI6eyJoZWFkZXJzIjp7ImNvbnRlbnQtdHlwZSI6ImFwcGxpY2F0aW9uL2pzb24ifSwic3RhdHVzIjoyMDAsImRhdGEiOnsiX2lkIjoiNWNmMTAyNjU3N2VmZDQzYmY0MjY1MWIyIiwicHJvZHVjdF9pZCI6IjVjZjBmMTcyZmFlMDc1MDAyYTdjNzUxYyIsImNvaW5fdmFsdWUiOjEsInBob25lX2VtYWlsIjoidmluaHBxQHZpb3NvZnQuY29tIiwiY29udGVudCI6ImhlbGxvIHlvdSIsInR5cGUiOjQwLCJhY2NvdW50X2lkIjoiNWNhMzA3ZjE2Y2Q3YmYwMDFhODQ2MDMyIiwidXBkYXRlZF9hdCI6IjIwMTktMDUtMzFUMTA6MzE6MDQuNzk3WiIsImNyZWF0ZWRfYXQiOiIyMDE5LTA1LTMxVDEwOjMxOjAyLjg4NloiLCJzdGF0dXMiOjQsInJvbGUiOjEsImV4cGlyZV90aW1lIjoiMjAxOS0wNS0zMVQxMDo0MTowNy42ODZaIiwicmVmX2lkIjoiNWNmMTAyNjY3N2VmZDQzYmY0MjY1MWIzIiwiY29pbl9uYW1lIjoiRVU0LUdBUyIsInByb2R1Y3QiOnsiX2lkIjoiNWNmMGYxNzJmYWUwNzUwMDJhN2M3NTFjIiwiY2F0ZWdvcnlfaWQiOiI1Y2VmNDY0ODM2MzVmYTJkMjRkNWYzNDEiLCJzZW5kZXJfcmV3YXJkIjo1LCJyZWNlaXZlcl9yZXdhcmQiOjUsImltYWdlX3VybCI6Imh0dHBzOi8vd3d3LmJiY2dvb2Rmb29kLmNvbS9zaXRlcy9kZWZhdWx0L2ZpbGVzL2d1aWRlL2d1aWRlLWltYWdlLzIwMTgvMDYvY2hpY2tlbi13aW5ncy1tYWluLmpwZyIsImFjY291bnRfaWQiOiI1YWM1ZjNlMDA0YjJjYTAwMTI1OTFiNjUiLCJ1cGRhdGVkX2F0IjoiMjAxOS0wNS0zMVQwOToxODo0Mi41MjlaIiwiY3JlYXRlZF9hdCI6IjIwMTktMDUtMzFUMDk6MTg6NDIuNTI5WiJ9LCJzdGFtcF9pZCI6bnVsbCwic3RhbXAiOnt9LCJpbWFnZV91cmwiOiJodHRwczovL3d3dy5iYmNnb29kZm9vZC5jb20vc2l0ZXMvZGVmYXVsdC9maWxlcy9ndWlkZS9ndWlkZS1pbWFnZS8yMDE4LzA2L2NoaWNrZW4td2luZ3MtbWFpbi5qcGciLCJyZWZfYWNjb3VudCI6eyJfaWQiOiI1YzY1MjQwNDFkOThhMzAwMTNiYmVkNzYiLCJmdWxsbmFtZSI6IlZpbmggUGhhbSIsImF2YXRhciI6InN0YXRpYy9pbWcvYXZhdGFyLnBuZyIsImVtYWlsIjoidmluaHBxQHZpb3NvZnQuY29tIn0sImFjY291bnQiOnsiX2lkIjoiNWNhMzA3ZjE2Y2Q3YmYwMDFhODQ2MDMyIiwiZnVsbG5hbWUiOiJ2aWV0dGEiLCJwaG9uZSI6Iis4NDM4OTMyOTQ0NyIsImF2YXRhciI6InN0YXRpYy9pbWcvYXZhdGFyLnBuZyJ9LCJ0eF9qb2JfaWQiOiI1Y2YxMDI2NzA5NDEzMzAwMmFmZDMxMGYifX0sImNvbnRlbnRUeXBlIjoiYXBwbGljYXRpb24vanNvbiJ9LHsiaWQiOiJpZDg2NTU3ODYzMDYyMTM3Ny41IiwibmFtZSI6IltBY3Rpdml0eSBzZXJ2aWNlXSBTZW5kIGEgc3RhbXAgZnJvbSB1c2VyIHBob3RvIiwiX3VybCI6Ii9hY3QvU3RhbXAvU2VuZD9maWVsZHM9e1wiX2lkXCI6MX0iLCJtZXRob2QiOiJQT1NUIiwidXJsIjoiaHR0cDovL2xvY2FsaG9zdDo2MTIxL2FjdC9TdGFtcC9TZW5kP2ZpZWxkcz17XCJfaWRcIjoxfSIsImhlYWRlcnMiOlt7ImtleSI6InRva2VuIiwidmFsdWUiOiJmMmE1YWFlMTFkYzkzYjQyZDY5Zjg1NjgwZmEzNjJmMCJ9LHsia2V5IjoiY29udGVudC10eXBlIiwidmFsdWUiOiJhcHBsaWNhdGlvbi9qc29uIn0se31dLCJib2R5Ijp7Impzb24iOnsiaW1hZ2VfdXJsIjoiaHR0cDovL2FiYy5jb20iLCJwaG9uZV9lbWFpbCI6InZpbmhwcUB2aW9zb2Z0LmNvbSIsImNvaW5fdmFsdWUiOjEsImNhdGVnb3J5X2lkIjoiNWNlZjQ2NDgzNjM1ZmEyZDI0ZDVmMzQxIiwiY29udGVudCI6ImhlbGxvIHlvdSJ9LCJmb3JtIjpbe31dfSwicmVzcG9uc2UiOnsiaGVhZGVycyI6eyJjb250ZW50LXR5cGUiOiJhcHBsaWNhdGlvbi9qc29uIn0sInN0YXR1cyI6MjAwLCJkYXRhIjp7Il9pZCI6IjVjZjEwMjczNzdlZmQ0M2JmNDI2NTFiNSJ9fSwiY29udGVudFR5cGUiOiJhcHBsaWNhdGlvbi9qc29uIn0seyJpZCI6ImlkNTU2OTAyNjkxMzkzODUyLjQiLCJuYW1lIjoiW0FjdGl2aXR5IHNlcnZpY2VdIEFjY2VwdCBhIHN0YW1wIGZyb20gdXNlciBwaG90byIsIl91cmwiOiIvYWN0L1N0YW1wL0FjY2VwdC81Y2YxMDI3Mzc3ZWZkNDNiZjQyNjUxYjUiLCJtZXRob2QiOiJQVVQiLCJ1cmwiOiJodHRwOi8vbG9jYWxob3N0OjYxMjEvYWN0L1N0YW1wL0FjY2VwdC81Y2YxMDI3Mzc3ZWZkNDNiZjQyNjUxYjUiLCJoZWFkZXJzIjpbeyJrZXkiOiJ0b2tlbiIsInZhbHVlIjoiYjg3OGEyMmRlMjZkOGZhYTVmMGUwZDA5Y2E5NzdmY2QifSx7ImtleSI6ImNvbnRlbnQtdHlwZSIsInZhbHVlIjoiYXBwbGljYXRpb24vanNvbiJ9LHt9XSwiYm9keSI6eyJqc29uIjp7fSwiZm9ybSI6W3t9XX0sInJlc3BvbnNlIjp7ImhlYWRlcnMiOnt9LCJzdGF0dXMiOjIwNCwiZGF0YSI6IiJ9LCJjb250ZW50VHlwZSI6ImFwcGxpY2F0aW9uL2pzb24ifSx7ImlkIjoiaWQzNzE4Nzc1NDgxNjg5Nzk1LjUiLCJuYW1lIjoiW0FjdGl2aXR5IHNlcnZpY2VdIFNlbmQgYSBzdGFtcCBmcm9tIHByb2R1Y3QiLCJfdXJsIjoiL2FjdC9TdGFtcC9TZW5kP2ZpZWxkcz17XCJfaWRcIjoxfSIsIm1ldGhvZCI6IlBPU1QiLCJ1cmwiOiJodHRwOi8vbG9jYWxob3N0OjYxMjEvYWN0L1N0YW1wL1NlbmQ%2FZmllbGRzPXtcIl9pZFwiOjF9IiwiaGVhZGVycyI6W3sia2V5IjoidG9rZW4iLCJ2YWx1ZSI6ImYyYTVhYWUxMWRjOTNiNDJkNjlmODU2ODBmYTM2MmYwIn0seyJrZXkiOiJjb250ZW50LXR5cGUiLCJ2YWx1ZSI6ImFwcGxpY2F0aW9uL2pzb24ifSx7fV0sImJvZHkiOnsianNvbiI6eyJwaG9uZV9lbWFpbCI6InZpbmhwcUB2aW9zb2Z0LmNvbSIsImNvaW5fdmFsdWUiOjEsInByb2R1Y3RfaWQiOiI1Y2YwZjE3MmZhZTA3NTAwMmE3Yzc1MWMiLCJjb250ZW50IjoiaGVsbG8geW91In0sImZvcm0iOlt7fV19LCJyZXNwb25zZSI6eyJoZWFkZXJzIjp7ImNvbnRlbnQtdHlwZSI6ImFwcGxpY2F0aW9uL2pzb24ifSwic3RhdHVzIjoyMDAsImRhdGEiOnsiX2lkIjoiNWNmMTAyNzc3N2VmZDQzYmY0MjY1MWI3In19LCJjb250ZW50VHlwZSI6ImFwcGxpY2F0aW9uL2pzb24ifSx7ImlkIjoiaWQyNjUwNzA2ODE5MDM1ODI4LjUiLCJuYW1lIjoiW0FjdGl2aXR5IHNlcnZpY2VdIEFjY2VwdCBhIHN0YW1wIGZyb20gcHJvZHVjdCIsIl91cmwiOiIvYWN0L1N0YW1wL0FjY2VwdC81Y2YxMDI3Nzc3ZWZkNDNiZjQyNjUxYjciLCJtZXRob2QiOiJQVVQiLCJ1cmwiOiJodHRwOi8vbG9jYWxob3N0OjYxMjEvYWN0L1N0YW1wL0FjY2VwdC81Y2YxMDI3Nzc3ZWZkNDNiZjQyNjUxYjciLCJoZWFkZXJzIjpbeyJrZXkiOiJ0b2tlbiIsInZhbHVlIjoiYjg3OGEyMmRlMjZkOGZhYTVmMGUwZDA5Y2E5NzdmY2QifSx7ImtleSI6ImNvbnRlbnQtdHlwZSIsInZhbHVlIjoiYXBwbGljYXRpb24vanNvbiJ9LHt9XSwiYm9keSI6eyJqc29uIjp7fSwiZm9ybSI6W3t9XX0sInJlc3BvbnNlIjp7ImhlYWRlcnMiOnt9LCJzdGF0dXMiOjIwNCwiZGF0YSI6IiJ9LCJjb250ZW50VHlwZSI6ImFwcGxpY2F0aW9uL2pzb24ifV0%3D)** |
| 1. [List activities with sorting based on priority \| BOTH SENDER AND RECEIVER FOR VINHPQ](http://test.onapis.com/Test?cmd=eyJpZCI6ImlkMzEyMTQ3MTgxNTY2MjY3MyIsIm5hbWUiOiJbQWN0aXZpdHkgc2VydmljZV0gTGlzdCBhY3Rpdml0aWVzIHdpdGggc29ydGluZyBiYXNlZCBvbiBwcmlvcml0eSB8IEJPVEggU0VOREVSIEFORCBSRUNFSVZFUiBGT1IgVklOSFBRIiwiX3VybCI6Ii9hY3QvQWN0aXZpdHkvTGlzdD9maWVsZHM9e1wiX2lkXCI6MSwgXCJzdGF0dXNcIjoxLCBcImFjY291bnRfaWRcIjoxfSZ3aGVyZT17XCJyb2xlXCI6e1wiJGluXCI6WzEsMl19fSZzb3J0PXtcInVwZGF0ZWRfYXRcIjotMX0mcGFnZT0xJnJlY29yZHNQZXJQYWdlPTEwIiwibWV0aG9kIjoiR0VUIiwidXJsIjoiaHR0cDovL2xvY2FsaG9zdDo2MTIxL2FjdC9BY3Rpdml0eS9MaXN0P2ZpZWxkcz17XCJfaWRcIjoxLCBcInN0YXR1c1wiOjEsIFwiYWNjb3VudF9pZFwiOjF9JndoZXJlPXtcInJvbGVcIjp7XCIkaW5cIjpbMSwyXX19JnNvcnQ9e1widXBkYXRlZF9hdFwiOi0xfSZwYWdlPTEmcmVjb3Jkc1BlclBhZ2U9MTAiLCJoZWFkZXJzIjpbeyJrZXkiOiJ0b2tlbiIsInZhbHVlIjoiZjJhNWFhZTExZGM5M2I0MmQ2OWY4NTY4MGZhMzYyZjAifSx7ImtleSI6ImNvbnRlbnQtdHlwZSIsInZhbHVlIjoiYXBwbGljYXRpb24vanNvbiJ9LHt9XSwiYm9keSI6eyJqc29uIjp7fSwiZm9ybSI6W3t9XX0sIm5vdGUiOiJTRU5ERVI6IHJvbGUgPSAxXG5SRUNFSVZFUjogcm9sZSA9IDJcbiIsInJlc3BvbnNlIjp7ImhlYWRlcnMiOnsiY29udGVudC10eXBlIjoiYXBwbGljYXRpb24vanNvbiJ9LCJzdGF0dXMiOjIwMCwiZGF0YSI6W3siX2lkIjoiNWNmMTAyNjU3N2VmZDQzYmY0MjY1MWIyIiwiYWNjb3VudF9pZCI6IjVjYTMwN2YxNmNkN2JmMDAxYTg0NjAzMiIsInN0YXR1cyI6NH1dfSwiY29udGVudFR5cGUiOiJhcHBsaWNhdGlvbi9qc29uIn0%3D) | [View](#id3121471815662673) |
| 2. [List activities with sorting based on priority \| BOTH SENDER AND RECEIVER](http://test.onapis.com/Test?cmd=eyJpZCI6ImlkMTM1MTI3MTg4NDUyNzk5MS41IiwibmFtZSI6IltBY3Rpdml0eSBzZXJ2aWNlXSBMaXN0IGFjdGl2aXRpZXMgd2l0aCBzb3J0aW5nIGJhc2VkIG9uIHByaW9yaXR5IHwgQk9USCBTRU5ERVIgQU5EIFJFQ0VJVkVSIiwiX3VybCI6Ii9hY3QvQWN0aXZpdHk%2FZmllbGRzPXtcIl9pZFwiOjEsIFwic3RhdHVzXCI6MSwgXCJhY2NvdW50X2lkXCI6MX0md2hlcmU9e1wicm9sZVwiOntcIiRpblwiOlsxLDJdfX0mc29ydD17XCJ1cGRhdGVkX2F0XCI6LTF9JnBhZ2U9MSZyZWNvcmRzUGVyUGFnZT0xMCIsIm1ldGhvZCI6IkdFVCIsInVybCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NjEyMS9hY3QvQWN0aXZpdHk%2FZmllbGRzPXtcIl9pZFwiOjEsIFwic3RhdHVzXCI6MSwgXCJhY2NvdW50X2lkXCI6MX0md2hlcmU9e1wicm9sZVwiOntcIiRpblwiOlsxLDJdfX0mc29ydD17XCJ1cGRhdGVkX2F0XCI6LTF9JnBhZ2U9MSZyZWNvcmRzUGVyUGFnZT0xMCIsImhlYWRlcnMiOlt7ImtleSI6InRva2VuIiwidmFsdWUiOiJmMmE1YWFlMTFkYzkzYjQyZDY5Zjg1NjgwZmEzNjJmMCJ9LHsia2V5IjoiY29udGVudC10eXBlIiwidmFsdWUiOiJhcHBsaWNhdGlvbi9qc29uIn0se31dLCJib2R5Ijp7Impzb24iOnt9LCJmb3JtIjpbe31dfSwibm90ZSI6IlNFTkRFUjogcm9sZSA9IDFcblJFQ0VJVkVSOiByb2xlID0gMlxuIiwicmVzcG9uc2UiOnsiaGVhZGVycyI6eyJjb250ZW50LXR5cGUiOiJhcHBsaWNhdGlvbi9qc29uIn0sInN0YXR1cyI6MjAwLCJkYXRhIjpbeyJfaWQiOiI1Y2YxMDI2NTc3ZWZkNDNiZjQyNjUxYjIiLCJhY2NvdW50X2lkIjoiNWNhMzA3ZjE2Y2Q3YmYwMDFhODQ2MDMyIiwic3RhdHVzIjo0fV19LCJjb250ZW50VHlwZSI6ImFwcGxpY2F0aW9uL2pzb24ifQ%3D%3D) | [View](#id1351271884527991.5) |
| 3. [Get Activity details](http://test.onapis.com/Test?cmd=eyJpZCI6ImlkMjQzMjc0MzY0MTk1NDU0NC41IiwibmFtZSI6IltBY3Rpdml0eSBzZXJ2aWNlXSBHZXQgQWN0aXZpdHkgZGV0YWlscyIsIl91cmwiOiIvYWN0L0FjdGl2aXR5LzphY3RfaWQiLCJtZXRob2QiOiJHRVQiLCJ1cmwiOiJodHRwOi8vbG9jYWxob3N0OjYxMjEvYWN0L0FjdGl2aXR5LzVjZjEwMjY1NzdlZmQ0M2JmNDI2NTFiMj9maWVsZHM9e1wiKlwiOjF9IiwiaGVhZGVycyI6W3sia2V5IjoidG9rZW4iLCJ2YWx1ZSI6ImYyYTVhYWUxMWRjOTNiNDJkNjlmODU2ODBmYTM2MmYwIn0seyJrZXkiOiJjb250ZW50LXR5cGUiLCJ2YWx1ZSI6ImFwcGxpY2F0aW9uL2pzb24ifSx7fV0sImJvZHkiOnsianNvbiI6e30sImZvcm0iOlt7fV19LCJyZXNwb25zZSI6eyJoZWFkZXJzIjp7ImNvbnRlbnQtdHlwZSI6ImFwcGxpY2F0aW9uL2pzb24ifSwic3RhdHVzIjoyMDAsImRhdGEiOnsiX2lkIjoiNWNmMTAyNjU3N2VmZDQzYmY0MjY1MWIyIiwicHJvZHVjdF9pZCI6IjVjZjBmMTcyZmFlMDc1MDAyYTdjNzUxYyIsImNvaW5fdmFsdWUiOjEsInBob25lX2VtYWlsIjoidmluaHBxQHZpb3NvZnQuY29tIiwiY29udGVudCI6ImhlbGxvIHlvdSIsInR5cGUiOjQwLCJhY2NvdW50X2lkIjoiNWNhMzA3ZjE2Y2Q3YmYwMDFhODQ2MDMyIiwidXBkYXRlZF9hdCI6IjIwMTktMDUtMzFUMTA6MzE6MDQuNzk3WiIsImNyZWF0ZWRfYXQiOiIyMDE5LTA1LTMxVDEwOjMxOjAyLjg4NloiLCJzdGF0dXMiOjQsInJvbGUiOjEsImV4cGlyZV90aW1lIjoiMjAxOS0wNS0zMVQxMDo0MTowNy42ODZaIiwicmVmX2lkIjoiNWNmMTAyNjY3N2VmZDQzYmY0MjY1MWIzIiwiY29pbl9uYW1lIjoiRVU0LUdBUyIsInByb2R1Y3QiOnsiX2lkIjoiNWNmMGYxNzJmYWUwNzUwMDJhN2M3NTFjIiwiY2F0ZWdvcnlfaWQiOiI1Y2VmNDY0ODM2MzVmYTJkMjRkNWYzNDEiLCJzZW5kZXJfcmV3YXJkIjo1LCJyZWNlaXZlcl9yZXdhcmQiOjUsImltYWdlX3VybCI6Imh0dHBzOi8vd3d3LmJiY2dvb2Rmb29kLmNvbS9zaXRlcy9kZWZhdWx0L2ZpbGVzL2d1aWRlL2d1aWRlLWltYWdlLzIwMTgvMDYvY2hpY2tlbi13aW5ncy1tYWluLmpwZyIsImFjY291bnRfaWQiOiI1YWM1ZjNlMDA0YjJjYTAwMTI1OTFiNjUiLCJ1cGRhdGVkX2F0IjoiMjAxOS0wNS0zMVQwOToxODo0Mi41MjlaIiwiY3JlYXRlZF9hdCI6IjIwMTktMDUtMzFUMDk6MTg6NDIuNTI5WiJ9LCJzdGFtcF9pZCI6bnVsbCwic3RhbXAiOnt9LCJpbWFnZV91cmwiOiJodHRwczovL3d3dy5iYmNnb29kZm9vZC5jb20vc2l0ZXMvZGVmYXVsdC9maWxlcy9ndWlkZS9ndWlkZS1pbWFnZS8yMDE4LzA2L2NoaWNrZW4td2luZ3MtbWFpbi5qcGciLCJyZWZfYWNjb3VudCI6eyJfaWQiOiI1YzY1MjQwNDFkOThhMzAwMTNiYmVkNzYiLCJmdWxsbmFtZSI6IlZpbmggUGhhbSIsImF2YXRhciI6InN0YXRpYy9pbWcvYXZhdGFyLnBuZyIsImVtYWlsIjoidmluaHBxQHZpb3NvZnQuY29tIn0sImFjY291bnQiOnsiX2lkIjoiNWNhMzA3ZjE2Y2Q3YmYwMDFhODQ2MDMyIiwiZnVsbG5hbWUiOiJ2aWV0dGEiLCJwaG9uZSI6Iis4NDM4OTMyOTQ0NyIsImF2YXRhciI6InN0YXRpYy9pbWcvYXZhdGFyLnBuZyJ9LCJ0eF9qb2JfaWQiOiI1Y2YxMDI2NzA5NDEzMzAwMmFmZDMxMGYifX0sImNvbnRlbnRUeXBlIjoiYXBwbGljYXRpb24vanNvbiJ9) | [View](#id2432743641954544.5) |
| 4. [Send a stamp from user photo](http://test.onapis.com/Test?cmd=eyJpZCI6ImlkODY1NTc4NjMwNjIxMzc3LjUiLCJuYW1lIjoiW0FjdGl2aXR5IHNlcnZpY2VdIFNlbmQgYSBzdGFtcCBmcm9tIHVzZXIgcGhvdG8iLCJfdXJsIjoiL2FjdC9TdGFtcC9TZW5kP2ZpZWxkcz17XCJfaWRcIjoxfSIsIm1ldGhvZCI6IlBPU1QiLCJ1cmwiOiJodHRwOi8vbG9jYWxob3N0OjYxMjEvYWN0L1N0YW1wL1NlbmQ%2FZmllbGRzPXtcIl9pZFwiOjF9IiwiaGVhZGVycyI6W3sia2V5IjoidG9rZW4iLCJ2YWx1ZSI6ImYyYTVhYWUxMWRjOTNiNDJkNjlmODU2ODBmYTM2MmYwIn0seyJrZXkiOiJjb250ZW50LXR5cGUiLCJ2YWx1ZSI6ImFwcGxpY2F0aW9uL2pzb24ifSx7fV0sImJvZHkiOnsianNvbiI6eyJpbWFnZV91cmwiOiJodHRwOi8vYWJjLmNvbSIsInBob25lX2VtYWlsIjoidmluaHBxQHZpb3NvZnQuY29tIiwiY29pbl92YWx1ZSI6MSwiY2F0ZWdvcnlfaWQiOiI1Y2VmNDY0ODM2MzVmYTJkMjRkNWYzNDEiLCJjb250ZW50IjoiaGVsbG8geW91In0sImZvcm0iOlt7fV19LCJyZXNwb25zZSI6eyJoZWFkZXJzIjp7ImNvbnRlbnQtdHlwZSI6ImFwcGxpY2F0aW9uL2pzb24ifSwic3RhdHVzIjoyMDAsImRhdGEiOnsiX2lkIjoiNWNmMTAyNzM3N2VmZDQzYmY0MjY1MWI1In19LCJjb250ZW50VHlwZSI6ImFwcGxpY2F0aW9uL2pzb24ifQ%3D%3D) | [View](#id865578630621377.5) |
| 5. [Accept a stamp from user photo](http://test.onapis.com/Test?cmd=eyJpZCI6ImlkNTU2OTAyNjkxMzkzODUyLjQiLCJuYW1lIjoiW0FjdGl2aXR5IHNlcnZpY2VdIEFjY2VwdCBhIHN0YW1wIGZyb20gdXNlciBwaG90byIsIl91cmwiOiIvYWN0L1N0YW1wL0FjY2VwdC81Y2YxMDI3Mzc3ZWZkNDNiZjQyNjUxYjUiLCJtZXRob2QiOiJQVVQiLCJ1cmwiOiJodHRwOi8vbG9jYWxob3N0OjYxMjEvYWN0L1N0YW1wL0FjY2VwdC81Y2YxMDI3Mzc3ZWZkNDNiZjQyNjUxYjUiLCJoZWFkZXJzIjpbeyJrZXkiOiJ0b2tlbiIsInZhbHVlIjoiYjg3OGEyMmRlMjZkOGZhYTVmMGUwZDA5Y2E5NzdmY2QifSx7ImtleSI6ImNvbnRlbnQtdHlwZSIsInZhbHVlIjoiYXBwbGljYXRpb24vanNvbiJ9LHt9XSwiYm9keSI6eyJqc29uIjp7fSwiZm9ybSI6W3t9XX0sInJlc3BvbnNlIjp7ImhlYWRlcnMiOnt9LCJzdGF0dXMiOjIwNCwiZGF0YSI6IiJ9LCJjb250ZW50VHlwZSI6ImFwcGxpY2F0aW9uL2pzb24ifQ%3D%3D) | [View](#id556902691393852.4) |
| 6. [Send a stamp from product](http://test.onapis.com/Test?cmd=eyJpZCI6ImlkMzcxODc3NTQ4MTY4OTc5NS41IiwibmFtZSI6IltBY3Rpdml0eSBzZXJ2aWNlXSBTZW5kIGEgc3RhbXAgZnJvbSBwcm9kdWN0IiwiX3VybCI6Ii9hY3QvU3RhbXAvU2VuZD9maWVsZHM9e1wiX2lkXCI6MX0iLCJtZXRob2QiOiJQT1NUIiwidXJsIjoiaHR0cDovL2xvY2FsaG9zdDo2MTIxL2FjdC9TdGFtcC9TZW5kP2ZpZWxkcz17XCJfaWRcIjoxfSIsImhlYWRlcnMiOlt7ImtleSI6InRva2VuIiwidmFsdWUiOiJmMmE1YWFlMTFkYzkzYjQyZDY5Zjg1NjgwZmEzNjJmMCJ9LHsia2V5IjoiY29udGVudC10eXBlIiwidmFsdWUiOiJhcHBsaWNhdGlvbi9qc29uIn0se31dLCJib2R5Ijp7Impzb24iOnsicGhvbmVfZW1haWwiOiJ2aW5ocHFAdmlvc29mdC5jb20iLCJjb2luX3ZhbHVlIjoxLCJwcm9kdWN0X2lkIjoiNWNmMGYxNzJmYWUwNzUwMDJhN2M3NTFjIiwiY29udGVudCI6ImhlbGxvIHlvdSJ9LCJmb3JtIjpbe31dfSwicmVzcG9uc2UiOnsiaGVhZGVycyI6eyJjb250ZW50LXR5cGUiOiJhcHBsaWNhdGlvbi9qc29uIn0sInN0YXR1cyI6MjAwLCJkYXRhIjp7Il9pZCI6IjVjZjEwMjc3NzdlZmQ0M2JmNDI2NTFiNyJ9fSwiY29udGVudFR5cGUiOiJhcHBsaWNhdGlvbi9qc29uIn0%3D) | [View](#id3718775481689795.5) |
| 7. [Accept a stamp from product](http://test.onapis.com/Test?cmd=eyJpZCI6ImlkMjY1MDcwNjgxOTAzNTgyOC41IiwibmFtZSI6IltBY3Rpdml0eSBzZXJ2aWNlXSBBY2NlcHQgYSBzdGFtcCBmcm9tIHByb2R1Y3QiLCJfdXJsIjoiL2FjdC9TdGFtcC9BY2NlcHQvNWNmMTAyNzc3N2VmZDQzYmY0MjY1MWI3IiwibWV0aG9kIjoiUFVUIiwidXJsIjoiaHR0cDovL2xvY2FsaG9zdDo2MTIxL2FjdC9TdGFtcC9BY2NlcHQvNWNmMTAyNzc3N2VmZDQzYmY0MjY1MWI3IiwiaGVhZGVycyI6W3sia2V5IjoidG9rZW4iLCJ2YWx1ZSI6ImI4NzhhMjJkZTI2ZDhmYWE1ZjBlMGQwOWNhOTc3ZmNkIn0seyJrZXkiOiJjb250ZW50LXR5cGUiLCJ2YWx1ZSI6ImFwcGxpY2F0aW9uL2pzb24ifSx7fV0sImJvZHkiOnsianNvbiI6e30sImZvcm0iOlt7fV19LCJyZXNwb25zZSI6eyJoZWFkZXJzIjp7fSwic3RhdHVzIjoyMDQsImRhdGEiOiIifSwiY29udGVudFR5cGUiOiJhcHBsaWNhdGlvbi9qc29uIn0%3D) | [View](#id2650706819035828.5) |

## API Document
### Activity service
1. <a name="id3121471815662673"></a>[**List activities with sorting based on priority | BOTH SENDER AND RECEIVER FOR VINHPQ**](http://test.onapis.com/Test?cmd=eyJpZCI6ImlkMzEyMTQ3MTgxNTY2MjY3MyIsIm5hbWUiOiJbQWN0aXZpdHkgc2VydmljZV0gTGlzdCBhY3Rpdml0aWVzIHdpdGggc29ydGluZyBiYXNlZCBvbiBwcmlvcml0eSB8IEJPVEggU0VOREVSIEFORCBSRUNFSVZFUiBGT1IgVklOSFBRIiwiX3VybCI6Ii9hY3QvQWN0aXZpdHkvTGlzdD9maWVsZHM9e1wiX2lkXCI6MSwgXCJzdGF0dXNcIjoxLCBcImFjY291bnRfaWRcIjoxfSZ3aGVyZT17XCJyb2xlXCI6e1wiJGluXCI6WzEsMl19fSZzb3J0PXtcInVwZGF0ZWRfYXRcIjotMX0mcGFnZT0xJnJlY29yZHNQZXJQYWdlPTEwIiwibWV0aG9kIjoiR0VUIiwidXJsIjoiaHR0cDovL2xvY2FsaG9zdDo2MTIxL2FjdC9BY3Rpdml0eS9MaXN0P2ZpZWxkcz17XCJfaWRcIjoxLCBcInN0YXR1c1wiOjEsIFwiYWNjb3VudF9pZFwiOjF9JndoZXJlPXtcInJvbGVcIjp7XCIkaW5cIjpbMSwyXX19JnNvcnQ9e1widXBkYXRlZF9hdFwiOi0xfSZwYWdlPTEmcmVjb3Jkc1BlclBhZ2U9MTAiLCJoZWFkZXJzIjpbeyJrZXkiOiJ0b2tlbiIsInZhbHVlIjoiZjJhNWFhZTExZGM5M2I0MmQ2OWY4NTY4MGZhMzYyZjAifSx7ImtleSI6ImNvbnRlbnQtdHlwZSIsInZhbHVlIjoiYXBwbGljYXRpb24vanNvbiJ9LHt9XSwiYm9keSI6eyJqc29uIjp7fSwiZm9ybSI6W3t9XX0sIm5vdGUiOiJTRU5ERVI6IHJvbGUgPSAxXG5SRUNFSVZFUjogcm9sZSA9IDJcbiIsInJlc3BvbnNlIjp7ImhlYWRlcnMiOnsiY29udGVudC10eXBlIjoiYXBwbGljYXRpb24vanNvbiJ9LCJzdGF0dXMiOjIwMCwiZGF0YSI6W3siX2lkIjoiNWNmMTAyNjU3N2VmZDQzYmY0MjY1MWIyIiwiYWNjb3VudF9pZCI6IjVjYTMwN2YxNmNkN2JmMDAxYTg0NjAzMiIsInN0YXR1cyI6NH1dfSwiY29udGVudFR5cGUiOiJhcHBsaWNhdGlvbi9qc29uIn0%3D) - [TOP ⇪](#ANCHOR_-1)

    **`GET`** **200** `${url}/Activity/List?fields={"_id":1, "status":1, "account_id":1}&where={"role":{"$in":[1,2]}}&sort={"updated_at":-1}&page=1&recordsPerPage=10`
    
    Request Header:
    ```json
    {
      "token": "f2a5aae11dc93b42d69f85680fa362f0",
      "content-type": "application/json"
    }
    ```
    
    ~~Request Body~~
    
    Response Header:
    ```json
    {
      "content-type": "application/json"
    }
    ```
    
    Response Data:
    ```json
    [
      {
        "_id": "5cf1026577efd43bf42651b2",
        "account_id": "5ca307f16cd7bf001a846032",
        "status": 4
      }
    ]
    ```
    
    **Notes:**
    ```
    SENDER: role = 1
    RECEIVER: role = 2
    
    ```
    
2. <a name="id1351271884527991.5"></a>[**List activities with sorting based on priority | BOTH SENDER AND RECEIVER**](http://test.onapis.com/Test?cmd=eyJpZCI6ImlkMTM1MTI3MTg4NDUyNzk5MS41IiwibmFtZSI6IltBY3Rpdml0eSBzZXJ2aWNlXSBMaXN0IGFjdGl2aXRpZXMgd2l0aCBzb3J0aW5nIGJhc2VkIG9uIHByaW9yaXR5IHwgQk9USCBTRU5ERVIgQU5EIFJFQ0VJVkVSIiwiX3VybCI6Ii9hY3QvQWN0aXZpdHk%2FZmllbGRzPXtcIl9pZFwiOjEsIFwic3RhdHVzXCI6MSwgXCJhY2NvdW50X2lkXCI6MX0md2hlcmU9e1wicm9sZVwiOntcIiRpblwiOlsxLDJdfX0mc29ydD17XCJ1cGRhdGVkX2F0XCI6LTF9JnBhZ2U9MSZyZWNvcmRzUGVyUGFnZT0xMCIsIm1ldGhvZCI6IkdFVCIsInVybCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NjEyMS9hY3QvQWN0aXZpdHk%2FZmllbGRzPXtcIl9pZFwiOjEsIFwic3RhdHVzXCI6MSwgXCJhY2NvdW50X2lkXCI6MX0md2hlcmU9e1wicm9sZVwiOntcIiRpblwiOlsxLDJdfX0mc29ydD17XCJ1cGRhdGVkX2F0XCI6LTF9JnBhZ2U9MSZyZWNvcmRzUGVyUGFnZT0xMCIsImhlYWRlcnMiOlt7ImtleSI6InRva2VuIiwidmFsdWUiOiJmMmE1YWFlMTFkYzkzYjQyZDY5Zjg1NjgwZmEzNjJmMCJ9LHsia2V5IjoiY29udGVudC10eXBlIiwidmFsdWUiOiJhcHBsaWNhdGlvbi9qc29uIn0se31dLCJib2R5Ijp7Impzb24iOnt9LCJmb3JtIjpbe31dfSwibm90ZSI6IlNFTkRFUjogcm9sZSA9IDFcblJFQ0VJVkVSOiByb2xlID0gMlxuIiwicmVzcG9uc2UiOnsiaGVhZGVycyI6eyJjb250ZW50LXR5cGUiOiJhcHBsaWNhdGlvbi9qc29uIn0sInN0YXR1cyI6MjAwLCJkYXRhIjpbeyJfaWQiOiI1Y2YxMDI2NTc3ZWZkNDNiZjQyNjUxYjIiLCJhY2NvdW50X2lkIjoiNWNhMzA3ZjE2Y2Q3YmYwMDFhODQ2MDMyIiwic3RhdHVzIjo0fV19LCJjb250ZW50VHlwZSI6ImFwcGxpY2F0aW9uL2pzb24ifQ%3D%3D) - [TOP ⇪](#ANCHOR_-1)

    **`GET`** **200** `${url}/Activity?fields={"_id":1, "status":1, "account_id":1}&where={"role":{"$in":[1,2]}}&sort={"updated_at":-1}&page=1&recordsPerPage=10`
    
    Request Header:
    ```json
    {
      "token": "f2a5aae11dc93b42d69f85680fa362f0",
      "content-type": "application/json"
    }
    ```
    
    ~~Request Body~~
    
    Response Header:
    ```json
    {
      "content-type": "application/json"
    }
    ```
    
    Response Data:
    ```json
    [
      {
        "_id": "5cf1026577efd43bf42651b2",
        "account_id": "5ca307f16cd7bf001a846032",
        "status": 4
      }
    ]
    ```
    
    **Notes:**
    ```
    SENDER: role = 1
    RECEIVER: role = 2
    
    ```
    
3. <a name="id2432743641954544.5"></a>[**Get Activity details**](http://test.onapis.com/Test?cmd=eyJpZCI6ImlkMjQzMjc0MzY0MTk1NDU0NC41IiwibmFtZSI6IltBY3Rpdml0eSBzZXJ2aWNlXSBHZXQgQWN0aXZpdHkgZGV0YWlscyIsIl91cmwiOiIvYWN0L0FjdGl2aXR5LzphY3RfaWQiLCJtZXRob2QiOiJHRVQiLCJ1cmwiOiJodHRwOi8vbG9jYWxob3N0OjYxMjEvYWN0L0FjdGl2aXR5LzVjZjEwMjY1NzdlZmQ0M2JmNDI2NTFiMj9maWVsZHM9e1wiKlwiOjF9IiwiaGVhZGVycyI6W3sia2V5IjoidG9rZW4iLCJ2YWx1ZSI6ImYyYTVhYWUxMWRjOTNiNDJkNjlmODU2ODBmYTM2MmYwIn0seyJrZXkiOiJjb250ZW50LXR5cGUiLCJ2YWx1ZSI6ImFwcGxpY2F0aW9uL2pzb24ifSx7fV0sImJvZHkiOnsianNvbiI6e30sImZvcm0iOlt7fV19LCJyZXNwb25zZSI6eyJoZWFkZXJzIjp7ImNvbnRlbnQtdHlwZSI6ImFwcGxpY2F0aW9uL2pzb24ifSwic3RhdHVzIjoyMDAsImRhdGEiOnsiX2lkIjoiNWNmMTAyNjU3N2VmZDQzYmY0MjY1MWIyIiwicHJvZHVjdF9pZCI6IjVjZjBmMTcyZmFlMDc1MDAyYTdjNzUxYyIsImNvaW5fdmFsdWUiOjEsInBob25lX2VtYWlsIjoidmluaHBxQHZpb3NvZnQuY29tIiwiY29udGVudCI6ImhlbGxvIHlvdSIsInR5cGUiOjQwLCJhY2NvdW50X2lkIjoiNWNhMzA3ZjE2Y2Q3YmYwMDFhODQ2MDMyIiwidXBkYXRlZF9hdCI6IjIwMTktMDUtMzFUMTA6MzE6MDQuNzk3WiIsImNyZWF0ZWRfYXQiOiIyMDE5LTA1LTMxVDEwOjMxOjAyLjg4NloiLCJzdGF0dXMiOjQsInJvbGUiOjEsImV4cGlyZV90aW1lIjoiMjAxOS0wNS0zMVQxMDo0MTowNy42ODZaIiwicmVmX2lkIjoiNWNmMTAyNjY3N2VmZDQzYmY0MjY1MWIzIiwiY29pbl9uYW1lIjoiRVU0LUdBUyIsInByb2R1Y3QiOnsiX2lkIjoiNWNmMGYxNzJmYWUwNzUwMDJhN2M3NTFjIiwiY2F0ZWdvcnlfaWQiOiI1Y2VmNDY0ODM2MzVmYTJkMjRkNWYzNDEiLCJzZW5kZXJfcmV3YXJkIjo1LCJyZWNlaXZlcl9yZXdhcmQiOjUsImltYWdlX3VybCI6Imh0dHBzOi8vd3d3LmJiY2dvb2Rmb29kLmNvbS9zaXRlcy9kZWZhdWx0L2ZpbGVzL2d1aWRlL2d1aWRlLWltYWdlLzIwMTgvMDYvY2hpY2tlbi13aW5ncy1tYWluLmpwZyIsImFjY291bnRfaWQiOiI1YWM1ZjNlMDA0YjJjYTAwMTI1OTFiNjUiLCJ1cGRhdGVkX2F0IjoiMjAxOS0wNS0zMVQwOToxODo0Mi41MjlaIiwiY3JlYXRlZF9hdCI6IjIwMTktMDUtMzFUMDk6MTg6NDIuNTI5WiJ9LCJzdGFtcF9pZCI6bnVsbCwic3RhbXAiOnt9LCJpbWFnZV91cmwiOiJodHRwczovL3d3dy5iYmNnb29kZm9vZC5jb20vc2l0ZXMvZGVmYXVsdC9maWxlcy9ndWlkZS9ndWlkZS1pbWFnZS8yMDE4LzA2L2NoaWNrZW4td2luZ3MtbWFpbi5qcGciLCJyZWZfYWNjb3VudCI6eyJfaWQiOiI1YzY1MjQwNDFkOThhMzAwMTNiYmVkNzYiLCJmdWxsbmFtZSI6IlZpbmggUGhhbSIsImF2YXRhciI6InN0YXRpYy9pbWcvYXZhdGFyLnBuZyIsImVtYWlsIjoidmluaHBxQHZpb3NvZnQuY29tIn0sImFjY291bnQiOnsiX2lkIjoiNWNhMzA3ZjE2Y2Q3YmYwMDFhODQ2MDMyIiwiZnVsbG5hbWUiOiJ2aWV0dGEiLCJwaG9uZSI6Iis4NDM4OTMyOTQ0NyIsImF2YXRhciI6InN0YXRpYy9pbWcvYXZhdGFyLnBuZyJ9LCJ0eF9qb2JfaWQiOiI1Y2YxMDI2NzA5NDEzMzAwMmFmZDMxMGYifX0sImNvbnRlbnRUeXBlIjoiYXBwbGljYXRpb24vanNvbiJ9) - [TOP ⇪](#ANCHOR_-1)

    **`GET`** **200** `${url}/Activity/:act_id`
    
    Request Header:
    ```json
    {
      "token": "f2a5aae11dc93b42d69f85680fa362f0",
      "content-type": "application/json"
    }
    ```
    
    ~~Request Body~~
    
    Response Header:
    ```json
    {
      "content-type": "application/json"
    }
    ```
    
    Response Data:
    ```json
    {
      "_id": "5cf1026577efd43bf42651b2",
      "product_id": "5cf0f172fae075002a7c751c",
      "coin_value": 1,
      "phone_email": "vinhpq@viosoft.com",
      "content": "hello you",
      "type": 40,
      "account_id": "5ca307f16cd7bf001a846032",
      "updated_at": "2019-05-31T10:31:04.797Z",
      "created_at": "2019-05-31T10:31:02.886Z",
      "status": 4,
      "role": 1,
      "expire_time": "2019-05-31T10:41:07.686Z",
      "ref_id": "5cf1026677efd43bf42651b3",
      "coin_name": "EU4-GAS",
      "product": {
        "_id": "5cf0f172fae075002a7c751c",
        "category_id": "5cef46483635fa2d24d5f341",
        "sender_reward": 5,
        "receiver_reward": 5,
        "image_url": "https://www.bbcgoodfood.com/sites/default/files/guide/guide-image/2018/06/chicken-wings-main.jpg",
        "account_id": "5ac5f3e004b2ca0012591b65",
        "updated_at": "2019-05-31T09:18:42.529Z",
        "created_at": "2019-05-31T09:18:42.529Z"
      },
      "stamp_id": null,
      "stamp": {},
      "image_url": "https://www.bbcgoodfood.com/sites/default/files/guide/guide-image/2018/06/chicken-wings-main.jpg",
      "ref_account": {
        "_id": "5c6524041d98a30013bbed76",
        "fullname": "Vinh Pham",
        "avatar": "static/img/avatar.png",
        "email": "vinhpq@viosoft.com"
      },
      "account": {
        "_id": "5ca307f16cd7bf001a846032",
        "fullname": "vietta",
        "phone": "+84389329447",
        "avatar": "static/img/avatar.png"
      },
      "tx_job_id": "5cf10267094133002afd310f"
    }
    ```
    
    
    
4. <a name="id865578630621377.5"></a>[**Send a stamp from user photo**](http://test.onapis.com/Test?cmd=eyJpZCI6ImlkODY1NTc4NjMwNjIxMzc3LjUiLCJuYW1lIjoiW0FjdGl2aXR5IHNlcnZpY2VdIFNlbmQgYSBzdGFtcCBmcm9tIHVzZXIgcGhvdG8iLCJfdXJsIjoiL2FjdC9TdGFtcC9TZW5kP2ZpZWxkcz17XCJfaWRcIjoxfSIsIm1ldGhvZCI6IlBPU1QiLCJ1cmwiOiJodHRwOi8vbG9jYWxob3N0OjYxMjEvYWN0L1N0YW1wL1NlbmQ%2FZmllbGRzPXtcIl9pZFwiOjF9IiwiaGVhZGVycyI6W3sia2V5IjoidG9rZW4iLCJ2YWx1ZSI6ImYyYTVhYWUxMWRjOTNiNDJkNjlmODU2ODBmYTM2MmYwIn0seyJrZXkiOiJjb250ZW50LXR5cGUiLCJ2YWx1ZSI6ImFwcGxpY2F0aW9uL2pzb24ifSx7fV0sImJvZHkiOnsianNvbiI6eyJpbWFnZV91cmwiOiJodHRwOi8vYWJjLmNvbSIsInBob25lX2VtYWlsIjoidmluaHBxQHZpb3NvZnQuY29tIiwiY29pbl92YWx1ZSI6MSwiY2F0ZWdvcnlfaWQiOiI1Y2VmNDY0ODM2MzVmYTJkMjRkNWYzNDEiLCJjb250ZW50IjoiaGVsbG8geW91In0sImZvcm0iOlt7fV19LCJyZXNwb25zZSI6eyJoZWFkZXJzIjp7ImNvbnRlbnQtdHlwZSI6ImFwcGxpY2F0aW9uL2pzb24ifSwic3RhdHVzIjoyMDAsImRhdGEiOnsiX2lkIjoiNWNmMTAyNzM3N2VmZDQzYmY0MjY1MWI1In19LCJjb250ZW50VHlwZSI6ImFwcGxpY2F0aW9uL2pzb24ifQ%3D%3D) - [TOP ⇪](#ANCHOR_-1)

    **`POST`** **200** `${url}/Stamp/Send?fields={"_id":1}`
    
    Request Header:
    ```json
    {
      "token": "f2a5aae11dc93b42d69f85680fa362f0",
      "content-type": "application/json"
    }
    ```
    
    Request Body:
    ```json
    {
      "image_url": "http://abc.com",
      "phone_email": "vinhpq@viosoft.com",
      "coin_value": 1,
      "category_id": "5cef46483635fa2d24d5f341",
      "content": "hello you"
    }
    ```
    
    Response Header:
    ```json
    {
      "content-type": "application/json"
    }
    ```
    
    Response Data:
    ```json
    {
      "_id": "5cf1027377efd43bf42651b5"
    }
    ```
    
    
    
5. <a name="id556902691393852.4"></a>[**Accept a stamp from user photo**](http://test.onapis.com/Test?cmd=eyJpZCI6ImlkNTU2OTAyNjkxMzkzODUyLjQiLCJuYW1lIjoiW0FjdGl2aXR5IHNlcnZpY2VdIEFjY2VwdCBhIHN0YW1wIGZyb20gdXNlciBwaG90byIsIl91cmwiOiIvYWN0L1N0YW1wL0FjY2VwdC81Y2YxMDI3Mzc3ZWZkNDNiZjQyNjUxYjUiLCJtZXRob2QiOiJQVVQiLCJ1cmwiOiJodHRwOi8vbG9jYWxob3N0OjYxMjEvYWN0L1N0YW1wL0FjY2VwdC81Y2YxMDI3Mzc3ZWZkNDNiZjQyNjUxYjUiLCJoZWFkZXJzIjpbeyJrZXkiOiJ0b2tlbiIsInZhbHVlIjoiYjg3OGEyMmRlMjZkOGZhYTVmMGUwZDA5Y2E5NzdmY2QifSx7ImtleSI6ImNvbnRlbnQtdHlwZSIsInZhbHVlIjoiYXBwbGljYXRpb24vanNvbiJ9LHt9XSwiYm9keSI6eyJqc29uIjp7fSwiZm9ybSI6W3t9XX0sInJlc3BvbnNlIjp7ImhlYWRlcnMiOnt9LCJzdGF0dXMiOjIwNCwiZGF0YSI6IiJ9LCJjb250ZW50VHlwZSI6ImFwcGxpY2F0aW9uL2pzb24ifQ%3D%3D) - [TOP ⇪](#ANCHOR_-1)

    **`PUT`** **204** `${url}/Stamp/Accept/${stamp._id}`
    
    Request Header:
    ```json
    {
      "token": "b878a22de26d8faa5f0e0d09ca977fcd",
      "content-type": "application/json"
    }
    ```
    
    ~~Request Body~~
    
    ~~Response Header~~
    
    ~~Response Data~~
    
    
    
6. <a name="id3718775481689795.5"></a>[**Send a stamp from product**](http://test.onapis.com/Test?cmd=eyJpZCI6ImlkMzcxODc3NTQ4MTY4OTc5NS41IiwibmFtZSI6IltBY3Rpdml0eSBzZXJ2aWNlXSBTZW5kIGEgc3RhbXAgZnJvbSBwcm9kdWN0IiwiX3VybCI6Ii9hY3QvU3RhbXAvU2VuZD9maWVsZHM9e1wiX2lkXCI6MX0iLCJtZXRob2QiOiJQT1NUIiwidXJsIjoiaHR0cDovL2xvY2FsaG9zdDo2MTIxL2FjdC9TdGFtcC9TZW5kP2ZpZWxkcz17XCJfaWRcIjoxfSIsImhlYWRlcnMiOlt7ImtleSI6InRva2VuIiwidmFsdWUiOiJmMmE1YWFlMTFkYzkzYjQyZDY5Zjg1NjgwZmEzNjJmMCJ9LHsia2V5IjoiY29udGVudC10eXBlIiwidmFsdWUiOiJhcHBsaWNhdGlvbi9qc29uIn0se31dLCJib2R5Ijp7Impzb24iOnsicGhvbmVfZW1haWwiOiJ2aW5ocHFAdmlvc29mdC5jb20iLCJjb2luX3ZhbHVlIjoxLCJwcm9kdWN0X2lkIjoiNWNmMGYxNzJmYWUwNzUwMDJhN2M3NTFjIiwiY29udGVudCI6ImhlbGxvIHlvdSJ9LCJmb3JtIjpbe31dfSwicmVzcG9uc2UiOnsiaGVhZGVycyI6eyJjb250ZW50LXR5cGUiOiJhcHBsaWNhdGlvbi9qc29uIn0sInN0YXR1cyI6MjAwLCJkYXRhIjp7Il9pZCI6IjVjZjEwMjc3NzdlZmQ0M2JmNDI2NTFiNyJ9fSwiY29udGVudFR5cGUiOiJhcHBsaWNhdGlvbi9qc29uIn0%3D) - [TOP ⇪](#ANCHOR_-1)

    **`POST`** **200** `${url}/Stamp/Send?fields={"_id":1}`
    
    Request Header:
    ```json
    {
      "token": "f2a5aae11dc93b42d69f85680fa362f0",
      "content-type": "application/json"
    }
    ```
    
    Request Body:
    ```json
    {
      "phone_email": "vinhpq@viosoft.com",
      "coin_value": 1,
      "product_id": "5cf0f172fae075002a7c751c",
      "content": "hello you"
    }
    ```
    
    Response Header:
    ```json
    {
      "content-type": "application/json"
    }
    ```
    
    Response Data:
    ```json
    {
      "_id": "5cf1027777efd43bf42651b7"
    }
    ```
    
    
    
7. <a name="id2650706819035828.5"></a>[**Accept a stamp from product**](http://test.onapis.com/Test?cmd=eyJpZCI6ImlkMjY1MDcwNjgxOTAzNTgyOC41IiwibmFtZSI6IltBY3Rpdml0eSBzZXJ2aWNlXSBBY2NlcHQgYSBzdGFtcCBmcm9tIHByb2R1Y3QiLCJfdXJsIjoiL2FjdC9TdGFtcC9BY2NlcHQvNWNmMTAyNzc3N2VmZDQzYmY0MjY1MWI3IiwibWV0aG9kIjoiUFVUIiwidXJsIjoiaHR0cDovL2xvY2FsaG9zdDo2MTIxL2FjdC9TdGFtcC9BY2NlcHQvNWNmMTAyNzc3N2VmZDQzYmY0MjY1MWI3IiwiaGVhZGVycyI6W3sia2V5IjoidG9rZW4iLCJ2YWx1ZSI6ImI4NzhhMjJkZTI2ZDhmYWE1ZjBlMGQwOWNhOTc3ZmNkIn0seyJrZXkiOiJjb250ZW50LXR5cGUiLCJ2YWx1ZSI6ImFwcGxpY2F0aW9uL2pzb24ifSx7fV0sImJvZHkiOnsianNvbiI6e30sImZvcm0iOlt7fV19LCJyZXNwb25zZSI6eyJoZWFkZXJzIjp7fSwic3RhdHVzIjoyMDQsImRhdGEiOiIifSwiY29udGVudFR5cGUiOiJhcHBsaWNhdGlvbi9qc29uIn0%3D) - [TOP ⇪](#ANCHOR_-1)

    **`PUT`** **204** `${url}/Stamp/Accept/${stamp._id}`
    
    Request Header:
    ```json
    {
      "token": "b878a22de26d8faa5f0e0d09ca977fcd",
      "content-type": "application/json"
    }
    ```
    
    ~~Request Body~~
    
    ~~Response Header~~
    
    ~~Response Data~~
    
    
    