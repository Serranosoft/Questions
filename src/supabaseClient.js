import { createClient } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto';

const supabaseUrl = "https://ukgelqpfnlytdjdnyrcd.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrZ2VscXBmbmx5dGRqZG55cmNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI1MDU1MTksImV4cCI6MTk4ODA4MTUxOX0.k4rVa2SMG2LIpB3Siyb6EjnzpHChGAih7kOBMWomdm0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey)