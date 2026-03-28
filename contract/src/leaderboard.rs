use soroban_sdk::Env;
use crate::storage_types::{LeaderboardSnapshot, DataKey};
use crate::errors::InsightArenaError;

/// Fetch a leaderboard snapshot for a specific season.
pub fn get_leaderboard(env: &Env, season_id: u32) -> Result<LeaderboardSnapshot, InsightArenaError> {
    let key = DataKey::Leaderboard(season_id);
    env.storage()
        .persistent()
        .get(&key)
        .ok_or(InsightArenaError::SeasonNotFound)
}

/// Store a leaderboard snapshot.
pub fn store_snapshot(env: &Env, snapshot: &LeaderboardSnapshot) {
    let key = DataKey::Leaderboard(snapshot.season_id);
    env.storage().persistent().set(&key, snapshot);
}