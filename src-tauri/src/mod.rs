// #![cfg_attr(
// all(not(debug_assertions), target_os = "windows"),
// windows_subsystem = "windows"
// )]
//
// // use std::task::Context;
// // use rand::prelude::*;
// // use std::fmt::Debug;
// // use unm_api_utils::executor::build_full_executor;
// // use unm_engine::executor::Executor;
// // use unm_engine_bilibili::{BilibiliEngine, ENGINE_ID as BILIBILI_ENGINE_ID};
// // use unm_types::{Song, Artist, Context};
// use std::collections::HashMap;
//
// // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// // #[tauri::command]
// // fn request() -> Result<(), Box<dyn std::error::Error>> {
// //     let resp = reqwest::blocking::get("https://httpbin.org/ip")?
// //         .json::<HashMap<String, String>>()?;
// //     println!("{:#?}", resp);
// //     Ok(())
// // }
// // #[tauri::command]
// // async fn get_song_result() -> String {
// //     // let mut executor = Executor::new();
// //     // executor.register(BILIBILI_ENGINE_ID, BilibiliEngine::new());
// //
// // // 您也可以直接使用官方預設的引擎集，免去手動註冊的麻煩。
// // // 首先得引入 `unm_api_utils`，然後就可以：
// //
// //     // use unm_api_utils::executor::build_full_executor;
// //     let executor = build_full_executor();
// //     let context = Context::default();
// //
// //     let search_result = executor.search(&[BILIBILI_ENGINE_ID], &Song {
// //         id: "".to_string(),
// //         name: "TT".to_string(),
// //         artists: vec![
// //             Artist {
// //                 id: "".to_string(),
// //                 name: "Twice".to_string(),
// //             }
// //         ],
// //     }, &context).await?;
// //
// //     let result = executor.retrieve(&search_result, &context).await?;
// //     println!("{:?}", result);
// //     "hello".to_string()
// // }
//
// #[tauri::command]
// fn greet(name: &str) -> String {
//     // let x: i8 = random();
//     // x.to_string();
//     // let combine = format!("name is: {}, random Number is: {}", name, x);
//     // let combine = format!("Hello, {}! your age is {}", name, x);
//     // let combine = name + &x;
//     // println!("{}", x);
//     // combine
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }
//
// #[tauri::command]
// fn get_version() -> String {
//     format!("hahav{}", env!("CARGO_PKG_VERSION"))
// }
//
// #[tauri::command]
// fn say_my_name(name: String) -> String {
//     println!("Say my name: {}", name);
//     "ok".into()
// }
//
// fn main() {
//     tauri::Builder::default()
//         .invoke_handler(tauri::generate_handler![greet, get_version, say_my_name])
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }
